import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Welcome to the Budget-App!'
    const wrapper = shallowMount(Home, {
      props: { msg }
    })
    expect(wrapper.text().substring(0, 26)).toMatch(msg)
  })
})
