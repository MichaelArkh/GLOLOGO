This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Example Quieries for graphiQL

###### Adding a logo with all colors white, text "hello world" and random values for everything else

```
mutation {
  addLogo(text: "hello world", color: "#ffffff", fontSize: 21, backgroundColor: "#ffffff",
    borderColor: "#ffffff", borderRadius: 20, borderWidth: 21, padding: 20, margin: 4){
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

###### Editing all colors to black for the logo we added, keep in mind all fields are required

```
mutation {
  updateLogo(id: "5e8a45f987539a3420a3a9d9", text: "hello world", color: "#000000", fontSize: 21, backgroundColor: "#000000",
    borderColor: "#000000", borderRadius: 20, borderWidth: 21, padding: 20, margin: 4){
    _id
    borderColor
  }
}
```
This gives "_id": "5e8a45f987539a3420a3a9d9", "borderColor": "#000000" which shows it has succeeded

###### Retreiving all logos, and their id, fontsize, and text

```
query{
  logos{
    _id,
    fontSize,
    text
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

