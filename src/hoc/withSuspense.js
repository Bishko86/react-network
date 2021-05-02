import React, { Suspense } from 'react';
import Preloader from './../common/Preloader'
const suspenseWrap = (Component) => {
  return (props) => {
    return <Suspense fallback={<Preloader from='HOC' />}>
      <Component {...props} />
    </Suspense>
  }
}
export default suspenseWrap;