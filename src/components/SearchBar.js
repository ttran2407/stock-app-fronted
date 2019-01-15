import React, { Component } from 'react'
import { Search} from 'semantic-ui-react'

export default class SearchBar extends Component {

  componentWillMount() {
    this.resetComponent()
  }

  state = {
    isLoading: false,
    results: [],
    value: ""
  }


  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
  }

  //   setTimeout(() => {
  //     if (this.state.value.length < 1) return this.resetComponent()
  //
  //     const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
  //     const isMatch = result => re.test(result.title)
  //
  //     this.setState({
  //       isLoading: false,
  //       results: _.filter(source, isMatch),
  //     })
  //   }, 300)
  // }

  render() {
    const { isLoading, value, results } = this.state

    return (
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />
    )
  }
}
