const blur = {}

// function setBlur (el, binding, newNode, oldNode)
function setBlur (el, binding) {
  el.style.filter = binding.value < 100 ? 'blur(3px)' : 'none'
  el.style.cursor = binding.value < 100 ? 'not-allowed' : 'inherit'

  el.querySelectorAll('i').forEach(a => {
    if (binding.value < 100) {
      a.style.visibility = 'hidden'
    } else {
      a.style.visibility = ''
    }
  })

  el.querySelectorAll('button').forEach(a => {
    if (binding.value < 100) {
      a.setAttribute('disabled', true)
    } else {
      a.removeAttribute('disabled')
    }
  })
}

blur.install = function (Vue) {
  Vue.directive('blur', {
    // hook: bind, update
    bind (el, binding) {
      setBlur(el, binding)
    }
  })
}

export default blur
