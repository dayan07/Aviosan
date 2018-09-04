import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';

import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {HTTP, HTTPResponse} from '@ionic-native/http';

@Injectable()
export class CustomHttpService {
  private useBrowserHttp: boolean = false;

  constructor(private nativeHttp: HTTP,
              private angularHttp: Http,
              private platform: Platform) {
    this.useBrowserHttp = (!window.cordova) || this.platform.is("core");
  }

  public post(url: string, body: any, headers?: { [key: string]: string }): Promise<CustomHttpResponse> {
    if (this.useBrowserHttp) {
      return this.angularPostReq(url, body, headers);
    }
    else {
      return this.nativePostReq(url, body, headers);
    }
  }

  public get(url: string, paramsObj?: any): Promise<CustomHttpResponse> {
    if (paramsObj) {
      url += '?' + this.encodeQueryParams(paramsObj);
    }
    if (this.useBrowserHttp) {
      return this.angularGetReq(url);
    }
    else {
      return this.nativeGetReq(url);
    }
  }

  public patch(url: string, body: any): Promise<CustomHttpResponse> {
    if (this.useBrowserHttp) {
      return this.angularPatchReq(url, body);
    }
    else {
      return this.nativePatchReq(url, body);
    }
  }

  public delete(url: string, body: any): Promise<CustomHttpResponse> {
    if (this.useBrowserHttp) {
      return this.angularPatchReq(url, body);
    }
    else {
      return this.nativeDeleteReq(url, body);
    }
  }
  private angularPostReq(url: string, body: any, headers: { [key: string]: string }): Promise<CustomHttpResponse> {
    let reqHeader = new Headers(headers);
    let options = new RequestOptions({headers: reqHeader});

    return this.angularHttp.post(url, body, options)
      .toPromise()
      .then((res: Response) => {
        return new CustomHttpResponse(res);
      }, (res: Response) => {
        return Promise.reject(new CustomHttpResponse(res));
      })
  }

  private nativePostReq(url: string,
                        body: any,
                        headers: { [key: string]: string } = {'Content-Type': 'application/json'}): Promise<CustomHttpResponse> {
    if (headers['Content-Type']) {
      let contentType = headers['Content-Type'];
      if (contentType == 'application/json') {
        this.nativeHttp.setDataSerializer('json');

      } else if (contentType.indexOf("xml") != -1) {
        this.nativeHttp.setDataSerializer("utf8");

      } else {
        this.nativeHttp.setDataSerializer(contentType);

      }
    }

    for (let key in headers) {
      let value: string = headers[key];
      this.nativeHttp.setHeader(key, value);
    }

    this.nativeHttp.acceptAllCerts(true);
    this.nativeHttp.enableSSLPinning(false);

    return this.nativeHttp.post(url, body, {})
      .then((res: HTTPResponse) => {
        return new CustomHttpResponse(res);
      }, (res: HTTPResponse) => {
        return Promise.reject(new CustomHttpResponse(res));
      });
  }


  private nativePatchReq(url: string, body: any): Promise<CustomHttpResponse> {
    this.nativeHttp.setDataSerializer('json');
    return this.nativeHttp.patch(url, body, {})
      .then((res: HTTPResponse) => {
        return new CustomHttpResponse(res);
      }, (res: HTTPResponse) => {
        return Promise.reject(new CustomHttpResponse(res));
      });
  }

  private angularPatchReq(url: string, body: any): Promise<CustomHttpResponse> {
    return this.angularHttp.patch(url, body)
      .toPromise()
      .then((res: Response) => {
        return new CustomHttpResponse(res);
      }, (res: Response) => {
        return Promise.reject(new CustomHttpResponse(res));
      })
  }

  private angularDeleteReq(url: string, body: any): Promise<CustomHttpResponse> {
    return this.angularHttp.delete(url, body)
      .toPromise()
      .then((res: Response) => {
        return new CustomHttpResponse(res);
      }, (res: Response) => {
        return Promise.reject(new CustomHttpResponse(res));
      })
  }

  private nativeDeleteReq(url: string, body: any): Promise<CustomHttpResponse> {
    this.nativeHttp.setDataSerializer('json');
    return this.nativeHttp.delete(url, body, {})
      .then((res: HTTPResponse) => {
        return new CustomHttpResponse(res);
      }, (res: HTTPResponse) => {
        return Promise.reject(new CustomHttpResponse(res));
      });
  }

  private angularGetReq(url: string): Promise<CustomHttpResponse> {
    this.nativeHttp.setDataSerializer('json');
    return this.angularHttp.get(url)
      .toPromise()
      .then((res: Response) => {
        return new CustomHttpResponse(res);
      }, (res: Response) => {
        return Promise.reject(new CustomHttpResponse(res));
      })
  }

  private nativeGetReq(url: string): Promise<CustomHttpResponse> {
    return this.nativeHttp.get(url, {}, {})
      .then((res: HTTPResponse) => {
        return new CustomHttpResponse(res);
      }, (res: HTTPResponse) => {
        return Promise.reject(new CustomHttpResponse(res));
      });
  }

  private encodeQueryParams(obj: any): string {
    let params = [];
    for (let name in obj)
      params.push(encodeURIComponent(name) + '=' + encodeURIComponent(obj[name]));
    return params.join('&');
  }
}

export class CustomHttpResponse {
  status: number;
  error: string;
  text: any;

  constructor(res: Response | HTTPResponse) {
    if (res instanceof Response) {
      this.status = res.status;
      this.text = res.text();
      if (res.ok) {
        this.error = res.statusText;
      }
    } else {
      this.status = res.status;
      this.error = (<HTTPResponse>res).error;
      this.text = (<HTTPResponse>res).data;
    }
  };

  json(): any {
    return JSON.parse(this.text);
  }
}
declare var window: any;

