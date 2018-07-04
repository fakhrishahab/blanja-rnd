import 'jquery';
import '@/desktop/scripts/components/alert/toast';
import '@/desktop/scripts/components/alert/information';
import '@/desktop/scripts/components/popovers/tooltips';
import '@/desktop/scripts/components/popovers/popovers';
import '@/desktop/scripts/components/modals/modals';
import '@/desktop/scripts/components/form/dropdown';

let elements = document.getElementsByClassName('uikit-code__rollable');
for(let el of elements){
  new Vue({
    el,
    data: {
      isCodeRolled: true
    },
    methods: {
      rollCode: function () {
        this.isCodeRolled = !this.isCodeRolled;
      }
    }
  });
}