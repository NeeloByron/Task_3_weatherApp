
export const ErrorMessage = () => {
  return (
        <>
          <div className={'errorCard'}>
            <div className={'errorHeader'}>
              <div className={'errorIcon'}>
                <i className={'fa-solid fa-circle-exclamation alert-icon'}></i>
              </div>
              <h3 className={'errorTitle'}>Something went wrong</h3>
            </div>
             <p className={'errorM'}>Message</p>
             <button className={'retryButton'}>
                <i className={'fa-solid fa-arrow-rotate-right retry-icon'}></i>
                <span className={'retryText'}>Try Again</span>
             </button>
          </div>

        </>
  )
}

export default ErrorMessage
