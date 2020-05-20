This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Example Quieries for graphiQL

###### Adding a logo for a sample email and sample texts

```
mutation {
  addLogo(email: "sample@gmail.com", name: "test1", text: [{content: "Hello World", color: "#000000", fontSize: 30, position:[1,2], index: 0}, {content: "World", color: "#ffffff", fontSize: 10, position:[3,4], index: 0}], imgs:[], dimensions: [200,300], backgroundColor: "#ffffff",
    borderColor: "#ffffff", borderRadius: 20, borderWidth: 21, padding: 20, margin: 20){
    _id
  }
}
```
This returns the id and in this example it is "5e8a45f987539a3420a3a9d9"

###### Retrieving the logo we added using its id, and getting only its color, backgroundColor, and padding

```
query{
  logo(id: "5e8a45f987539a3420a3a9d9") {
    color
    backgroundColor
    padding
  }
}
```
This gives "color": "#ffffff", "backgroundColor": "#ffffff", "padding": 20 which is correct

###### Retrieving the logos from an email
```
query {
  logosE(email: "sample@gmail.com") {
    _id
    email
    text {
      content
    }
  }
}
```

###### Editing the sample logo text

```
mutation {
  updateLogo(id: "5e8a45f987539a3420a3a9d9", name: "test1", email: "sample@gmail.com", imgs:[], text: [{content: "World", color: "#000000", fontSize: 30, position:[1,2], index: 0}, {content: "Hello", color: "#ffffff", fontSize: 10, position:[3,4], index: 0}], dimensions:[200,300], backgroundColor: "#000000",
    borderColor: "#000000", borderRadius: 20, borderWidth: 21, padding: 20, margin: 20){
    _id
    email
    text {
      content
    }
  }
}
```
This gives "_id": "5e8a45f987539a3420a3a9d9", "borderColor": "#000000" and the new text which shows it has succeeded

###### Retreiving all logos, and their id, fontsize, and text

```
query{
  logos{
    _id,
    fontSize,
    text {
      content
    }
  }
}
```

###### Removing the logo we added

```
mutation {
  removeLogo(id: "5e8a45f987539a3420a3a9d9"){
    _id
  }
}
```

###### Removing the logos for a specific email

```
mutation {
	removeLogos(email: "sample@gmail.com"){
     deletedCount
	}
}
```

###### Removing all data

```
mutation {
  purgeData {
    deletedCount
  }
}
```

