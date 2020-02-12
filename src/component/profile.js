import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      list: [],
      text: '',
      image: []
    }
  }
  //********** */

  handleText(e) {
    this.setState({
      text: e.target.value
    })
  }

  addSkill() {
    const { list, text } = this.state;
    list.push(text)
    this.setState({ list, text: '' })
  }

  handleRemove(index) {
    this.state.list.splice(index, 1)
    this.setState({
      list: this.state.list
    })
  }

  //********************* */

  imageChange = (event) => {
    console.log("====>", event.target.files[0])
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      let dataUrl = reader.result;
      let output = document.getElementById('img')
      output.src = dataUrl
      console.log('Encoded image data on Base 64::', reader.result);

      // let data=(reader.result).split(',')[1];
      // let binary = atob(data);
      // console.log('Encoded Binary File String:', binary);
    }
    reader.readAsDataURL(file);

    this.setState({
      // image: URL.createObjectURL(event.target.files[0])
      image: event.target.files[0]
    })
  }

  //******************* */

  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submitProfile = (e) => {
    e.preventDefault()
    const { fields, list, text, image } = this.state
    console.log(fields, list, text, image)
  }

  render() {
    return (
      <div>
        <form method="post" name="userProfile" onSubmit={this.submitProfile} >
          <label>Name:</label>
          <input type="text" name="Name" value={this.state.fields.name} onChange={this.handleChange} />
          <br /><br />
          <label>age:</label>
          <input type="number" name="Age" value={this.state.fields.age} onChange={this.handleChange} />
          <br />
          <br />

          <label>Skills:</label>
          <input type='text' name="Skills" value={this.state.text} onChange={(e) => this.handleText(e)} />
          <button onClick={() => this.addSkill()}>Add</button><br /><br />
          {
            this.state.list.map((item, index) => {
              return (
                <div key={index}>
                  <input value={item} readOnly />
                  <button onClick={() => this.handleRemove(index)}>Remove</button>
                </div>
              )
            })
          }

          <br /><br />
          <input type="file" onChange={this.imageChange} />
          <img id="img" />
          <br /><br />
          {
          }
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default Profile;
