    (function () {
      const LOOP = true;
      const steps = Array.from(document.querySelectorAll('.step'));
      const continueBtn = document.getElementById('continue-btn');
      const continueLabel = document.getElementById('continue-label');
      const previousBtn = document.getElementById('previous-btn');

      let current = steps.findIndex(s => !s.classList.contains('hidden'));
      if (current === -1 && steps.length > 0) {
        current = 0;
        steps[0].classList.remove('hidden');
        steps[0].classList.add('block');
      }

      function showStep(i) {
        steps.forEach((s, idx) => {
          s.classList.toggle('hidden', idx !== i);
          s.classList.toggle('block', idx === i);
        });

        if (continueLabel) {
          if (i < steps.length - 1) {
            continueLabel.textContent = 'Click this to continue';
          } else {
            continueLabel.textContent = LOOP ? 'Restart' : 'Finish';
          }
        }
      }

      function nextStep() {
        if (current < steps.length - 1) {
          current++;
        } else if (LOOP) {
          current = 0;
        } else {
          return;
        }
        showStep(current);
      }

      function previousStep() {
        if (current > 0) {
          current--;
        } else if (LOOP) {
          current = steps.length - 1;
        } else {
          return;
        }
        showStep(current);
      }

      if (continueBtn) {
        continueBtn.addEventListener('click', function (e) {
          e.preventDefault();
          nextStep();
        });
      }

      if (previousBtn) {
        previousBtn.addEventListener('click', function (e) {
          e.preventDefault();
          previousStep();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          nextStep();
        } else if (e.key === 'ArrowLeft') {
          previousStep();
        }
      });
    })();