import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

const ScaleLoaderSpinner = () => {
    return <div className="Loader_Prop">
        <ScaleLoader
            color="#3aafa9"
            height={75}
            loading
            margin={5}
            radius={6}
            speedMultiplier={1}
            width={7}
        /> </div>
}


export default ScaleLoaderSpinner
