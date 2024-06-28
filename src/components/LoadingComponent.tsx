import { Spinner } from '@nextui-org/react'
import React from 'react'

const LoadingComponent = ({ label }: { label?: string }) => {
    return (
        <div className='flex justify-center items-center vertical-center'>
            <Spinner
                label={label || 'Loading...'}
                color='secondary'
                labelColor='secondary'
            />
        </div>
    )
}
export default LoadingComponent
