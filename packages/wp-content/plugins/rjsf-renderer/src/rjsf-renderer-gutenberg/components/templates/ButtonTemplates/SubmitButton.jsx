import { getSubmitButtonOptions } from '@rjsf/utils';
import { Button } from '@wordpress/components';
import confetti from 'canvas-confetti';
/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
export default function SubmitButton({ uiSchema }) {
  const { submitText, norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (<div>
    <Button
      type="submit"
      onClick ={spassss}
      variant="primary">
      {submitText}
    </Button>
  </div>);
}

function spassss(){
  if (Math.floor(Math.random() * 100) < 10) {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }
}
