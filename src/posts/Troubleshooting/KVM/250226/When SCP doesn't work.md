## SCP
- Secure Copy Protocol
- Uses TCP 22 port

```
scp: Perceived message too long
scp: Ensure the remote shell produces no output for non-interactive sessions.
```
Encountered the messages above.

### problem explanation

![solve_error1](/Troubleshooting/KVM/250226/solve_error1.png)

In the image above, you can see that I have a private key file named `aws8.pem`. I want to transfer this file to an AWS EC2 instatnce.

I could use the `vi` command to open the file, copy its contents, and paste them into the instance. But this method only works if the file is readable (i.e., its contents can be copied as text)

For non-readable files, You need to use SCP.

`scp -i [connect key] [the file's direction wants to send] [user name]@[ip to send]:[direction to save]`

-> I tried to use this command.

![solve_error2](/Troubleshooting/KVM/250226/solve_error2.png)

but it didn't work.

> WHY?

As you can see the picture, when I ran the `ls` command after the transfer, the file was not present.

#### permission problem

SCP command doesn't grant root access by default.

### problem solve

![solve_error3](/Troubleshooting/KVM/250226/solve_error3.png)

To work around this, I transferred the file to a user's home directory, which doe snot require root permissions.