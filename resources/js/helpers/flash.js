export default {
  state: {
    success: null,
    error: null
  },
  setSuccess(message) {
    this.state.success = message
  }
}