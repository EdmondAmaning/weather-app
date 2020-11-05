import React                        from 'react';
import MetaTags                     from 'react-meta-tags';

const MT = (data) => {
  return (
    <MetaTags>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
    </MetaTags>
  )
}


export default class View extends React.Component {
  render() {
      return (
          <>
            <MT title="404" description="404" />
            <div id="">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-5">
                            <h1>404, Page not found</h1>
                        </div>
                    </div>
                </div>
            </div>
          </>  
      );
  }
}