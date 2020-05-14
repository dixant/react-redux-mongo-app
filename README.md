In This task, following tech stack is used:test
  1. ReactJS using only react hooks (Using TS will be an advantage)
  2. Redux using only hooks provided by react-redux library (Use redux state as your app state)
  3. NodeJS + Express (Using TS will be an advantage)
  4. MongoDB + Mongoose

Task is as follows:
1. Set up MongoDB in the cloud
2.   Create model Deployment with Mongoose:
    1. url: string with url
    2. templateName: string with template name
    3. version: string with semantic version
    4. deployedAt: date when it was added
3.  Create NodeJS API (get deployments, add deployment, delete deployment)
4.  Use following templates data: npoint.io/docs/8f7cf8628b367ffd50a2
5.  Pull deployments and render them on the list. Each one should have a delete button that removes it from the list and from the db.
6.  Render a form before the list. The user should be able to select a template, its version and add any URL. After submitting the form, the new deployment should be added to dB and to the list.
7.  Deploy your code to any platform so that its ready to see it live. Also, provide a link to the GitHub repo.

## Available Scripts

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `cd src/server`
### `nodemon server.js`
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.
