import Vue from 'vue'
import header from '@/components/partials/header'

describe('Header.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(header)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.test').textContent)
      .toEqual('test')
  })
})
