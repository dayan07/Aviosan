import { Directive, Attribute  } from '@angular/core';

@Directive({
  selector: '[phone-number-mask]',
  host: {
    '(keyup)': 'onInputChange($event)'
  }
})
export class PhoneNumberMaskDirective  {

  pattern: string;

  constructor(
    @Attribute('phone-number-mask') pattern: string
  ) {
    this.pattern = pattern;
  }

  onInputChange(e) {
    try {

      let value = e.target.value,
        caret = e.target.selectionStart,
        pattern = this.pattern,
        reserve = pattern.replace(/\*/, 'g'),
        applied = '',
        ordinal = 0;

      if (e.keyCode === 8 || e.key === 'Backspace' || e.keyCode === 46 || e.key === 'Delete') {
        if (value.length) {
          while (value.length && pattern[value.length] && pattern[value.length] !== '*') {
            value = value.substring(0, value.length - 1);
          }
          if (pattern.substring(0, value.length).indexOf('*') < 0) {
            value = value.substring(0, value.length - 1);
          }
        }
      }

      for (let i = 0; i < value.length; i++) {
        if (i < pattern.length) {
          if (value[i] === pattern[ordinal]) {
            applied += value[i];
            ordinal++;
          } else if (reserve.indexOf(value[i]) > -1) {
          } else {
            while (ordinal < pattern.length && pattern[ordinal] !== '*') {
              applied += pattern[ordinal];
              ordinal++;
            }
            applied += value[i];
            ordinal++;
            while (ordinal < pattern.length && pattern[ordinal] !== '*') {
              applied += pattern[ordinal];
              ordinal++;
            }
          }
        }
      }
      e.target.value = applied;
      if (caret < value.length) {
        e.target.setSelectionRange(caret, caret);
      }
    } catch (ex) {
      console.error(ex.message);
    }
  }
}
