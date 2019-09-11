workflow "Send notification on push" {
  on = "push"
  resolves = [
    "Dingtalk notification",
  ]
}

action "Dingtalk notification" {
  uses = "cooperwu/action-dingtalk@master"
  secrets = ["DINGTALK_WEBHOOK"]
  args = "A new commit has been pushed to cooperwu/action-dingtalk."
}
