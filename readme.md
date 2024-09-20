# How to Use this software?
1. Signup from [Here](https://nerdyabhi-blogify.vercel.app/)

2. And Click on Create a blog / pencil icon to write a blog.

3. You can visit "/profile" endpoint to check your blogs/details as well.

# How to fork this project?
1. Fork this repo
2. `npm install` to install dependencies.

3. Create a `.env` file 
```js
API_KEY = "Your cloudinary data"
API_SECRET = "Your cloudinary data"
CLOUD_NAME = "Your cloudinary data"    
MONGO_DB_URL = "your mongodb connection url"

```

4. All folders have their meanings.

5. Play with code and have fun.



# Technologies used?
1. Express JS / Node js -- for creating server and defining flow of backend.

2. Multer JS to upload images from user device to server and Cloudinary to host those images.

3. Bcrypt.js to hash user's passsword.

4. Mongo DB to store user data and their blogs.


## TO do
- [ ] User can Edit and Delete their own Blogs
- [ ] "/settings" - User can edit their personal info.
- [ ] Options for user to Comment / like / share a post.
- [ ] Google Auth / more secured login process with OTP's (optional login) 
- [ ] avail guest login
