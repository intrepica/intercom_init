Intercom Init
====================

About
--------------
Instantiates intercom.io using INTERCOM_API_KEY & INTERCOM_APP_ID environment variables.

Setup
--------------

```sh
npm install intercom_init
```

Example
--------------

Define env variables

```sh
INTERCOM_API_KEY=apiKey
INTERCOM_APP_ID=appId
```

```js

	var intercom = require('intercom_init');

	// Intercom is instantiated
	intercom.getUsers(userId, callback);

```

