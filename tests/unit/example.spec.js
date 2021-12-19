import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Welcome to the Budget-App!Your finances at a glance:Easily manage your finances from everywhere.Get started today!'
    const wrapper = shallowMount(Home, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
