import React, { Component } from 'react'

export default class AddTextBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      text: '',
      list: []
    }
  }
  handleText = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      text: e.target.value
    })
  }
  handleSubmit = () => {
    const { text, list } = this.state;
    list.push(text);
    this.setState({
      list,
      text: ''
    })
  }

  handleRemove = (index) => {
    this.state.list.splice(index, 1)
    this.setState({
      list: this.state.list
    })
  }

  render() {
    return (
      <div>

        <input type='text' name='skills' value={this.state.text} onChange={this.handleText} />
        <button onClick={this.handleSubmit} >Add</button><br /><br />
        {
          this.state.list.map((item, index) => {
            return (<div key={index} >
              <input value={item} />
              <button onClick={this.handleRemove}><span>&#10005;</span></button>
            </div>
            )
          })
        }
      </div>
    )
  }
}
