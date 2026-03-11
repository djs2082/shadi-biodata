import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { checkPaymentStatus } from '../services/paymentService';
import './PaymentStatus.css';

interface PaymentResult {
  success: boolean;
  paymentSuccess: boolean;
  transactionId: string;
  phonepeTransactionId?: string;
  amount?: number;
  status: string;
  message: string;
}

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);

  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    if (!transactionId) {
      navigate('/');
      return;
    }

    const checkStatus = async () => {
      setLoading(true);
      const result = await checkPaymentStatus(transactionId);
      setPaymentResult(result);
      setLoading(false);

      if (result.paymentSuccess) {
        setDownloadReady(true);
        // Store payment success in sessionStorage for download
        sessionStorage.setItem('paymentSuccess', 'true');
        sessionStorage.setItem('transactionId', transactionId);
      }
    };

    // Check status immediately
    checkStatus();

    // Poll for status every 3 seconds if still pending
    const interval = setInterval(() => {
      if (paymentResult?.status === 'PENDING') {
        checkStatus();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [transactionId, navigate]);

  const handleDownload = () => {
    // Navigate back to biodata page with download flag
    navigate('/?download=true');
  };

  const handleRetry = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="payment-status-container">
        <div className="payment-status-card loading">
          <div className="spinner"></div>
          <h2>Verifying Payment...</h2>
          <p>Please wait while we confirm your payment</p>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return (
      <div className="payment-status-container">
        <div className="payment-status-card error">
          <div className="status-icon error">!</div>
          <h2>Something went wrong</h2>
          <p>Unable to verify payment status</p>
          <button onClick={handleRetry} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-status-container">
      <div className={`payment-status-card ${paymentResult.paymentSuccess ? 'success' : 'failed'}`}>
        {paymentResult.paymentSuccess ? (
          <>
            <div className="status-icon success">✓</div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your payment</p>

            <div className="payment-details">
              <div className="detail-row">
                <span>Transaction ID:</span>
                <span>{paymentResult.transactionId}</span>
              </div>
              {paymentResult.phonepeTransactionId && (
                <div className="detail-row">
                  <span>PhonePe Ref:</span>
                  <span>{paymentResult.phonepeTransactionId}</span>
                </div>
              )}
              {paymentResult.amount && (
                <div className="detail-row">
                  <span>Amount Paid:</span>
                  <span>₹{paymentResult.amount}</span>
                </div>
              )}
            </div>

            {downloadReady && (
              <button onClick={handleDownload} className="btn-primary download-btn">
                Download Your Biodata
              </button>
            )}
          </>
        ) : (
          <>
            <div className="status-icon failed">✗</div>
            <h2>Payment Failed</h2>
            <p>{paymentResult.message || 'Your payment could not be processed'}</p>

            <div className="payment-details">
              <div className="detail-row">
                <span>Status:</span>
                <span>{paymentResult.status}</span>
              </div>
              <div className="detail-row">
                <span>Transaction ID:</span>
                <span>{paymentResult.transactionId}</span>
              </div>
            </div>

            <button onClick={handleRetry} className="btn-primary">
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
