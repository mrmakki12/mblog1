# mblog1
Fullstack Blog App
## Use
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;Users(including you) should be able to create an account and log in. Your passwords are pretty secure, they've been hashed and salted and stored in a database. Since you're here, you've already done that! If you would like, you could write a couple of articles using markdown/HTML by going to your profile page. Your profile page can be accessed by clicking on the circle link with the first letter of your username in the middle. This link is always in the top right corner. When you get to your profile page you can click the "+" next to the "Your Articles" header, it'll take you to the form to write your article.
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;Once your article is submitted in can access it by going back to your profile or by clicking the "All Articles" link in the top left of the screen. If you would like to edit your articles, navigate to your profile and click on the pen image next to whichever article you'd like to update. 
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;You can also comment on your own article as well as articles by other users. You can do this by going to "All articles" link then click on an article you'd like to read. Once you're there, there should be a form at the bottom which displays all comments and presents a form that should allow you to leave a comment.
<br />
<br />

## Bugs
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;Since the last version, majority of the bugs have been fixed! Browser navigation  now works as expected. Comments also show up on submit. After doing some research I found a solution that works perfectly. The solution is to have a catch all route in my Express app. When someone makes a request to for example "mblog-api.herokuapp.com/articles," which doesn't exist, the catch all route sends the entry point file (index.html) to the frontend, then react-router tacks on the "/articles" in this case. To get the comment submitted to show up I just reload the page, which isn't the best solution, but it'll work for now. This solution is only possible because of the catch all route.
<br />
<br />

### Browser Navigation 2
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;The only issue left that I would like to fix is to navigate users, who already have an account and a valid cookie in their browser, to their profile page instead of having them log in again. If you have ideas feel free to leave a comment.
