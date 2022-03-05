export default {
  name: 'tooltip',
  install(Vue) {
    Vue.directive('tooltip', {
      bind(el, binding) {
        el.addEventListener('mouseenter', () => {
          const tooltip = document.createElement('div');
          const tooltipDimension = el.getBoundingClientRect();
          tooltip.setAttribute('class', 'tooltip');
          tooltip.setAttribute('id', 'custom-tooltip');
          tooltip.innerHTML = binding.value;
          tooltip.style.left = tooltipDimension.left - (tooltipDimension.width / 2) + 'px';
          tooltip.style.top = tooltipDimension.top - 35 + 'px';
          document.body.appendChild(tooltip);
        })
        el.addEventListener('mouseleave', function () {
          const elemToRemove = document.getElementById('custom-tooltip')
          elemToRemove.parentNode.removeChild(elemToRemove)
        })
      }
    })
  }
}