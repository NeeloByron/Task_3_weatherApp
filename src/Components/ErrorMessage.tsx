import React from 'react'

interface ErrorMessageProps {
  // The error text to show the user
  message: string;
  onRetry?: (city?: string) => Promise<void>;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
        <>
          <div className={'errorCard'}>
            <div className={'errorHeader'}>
             {/* show a warning icon next to the error */}
              <div className={'errorIcon'}>
                <i className={'fa-solid fa-circle-exclamation alert-icon'}></i>
              </div>
              <h3 className={'errorTitle'}>{message}</h3>
            </div>
            {/* Show the button only if a retry function was provided. */}
             {onRetry && <button  
                        // Run the retry function when the user clicks
                        onClick={() => void onRetry()} 
                        className={'retryButton'}>
                <i className={'fa-solid fa-arrow-rotate-right retry-icon'}></i>
                <span className={'retryText'}>Try Again</span>
             </button>}
          </div>

        </>
  )
}

export default ErrorMessage
