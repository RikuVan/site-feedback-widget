
import App from './App.svelte'

window.site_feedback_widget = function(props) {
  const id = props && props.id ? props.id : 'site-feedback-widget'
  return new App({
    target: document.getElementById(id),
    props: {
      ...props,
      feedbackOffset: 700,
      autoOpen: true
    }
  })
}
