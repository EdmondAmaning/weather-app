import React                        from 'react';
import MetaTags                     from 'react-meta-tags';

import Search                       from './components/search'

const MT = (data) => {
  return (
    <MetaTags>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
    </MetaTags>
  )
}

export default class View extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: 'Weather'
    }
  }

  render() {
    const _ = this.state
      return (
          <>
            <MT title={_.title} description="Weather web app" />
            <Search />
          </>  
      );
  }
}
