import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degreeEmoji'
})
export class DegreeEmojiPipe implements PipeTransform {
  transform(value: number): unknown {
    if (value >= 40) {
      return "🔥";
    }

    if (value >= 30) {
      return "🥵";
    }

    if (value >= 18) {
      return "😊";
    }

    if (value >= 8) {
      return "🥶";
    }

    return "🧊";
  }
}
