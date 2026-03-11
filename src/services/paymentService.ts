const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface PaymentInitiateRequest {
  amount: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export interface PaymentInitiateResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  redirectUrl?: string;
  error?: unknown;
}

export interface PaymentStatusResponse {
  success: boolean;
  paymentSuccess: boolean;
  transactionId: string;
  phonepeTransactionId?: string;
  amount?: number;
  status: string;
  message: string;
}

/**
 * Initiate a payment request
 */
export async function initiatePayment(
  data: PaymentInitiateRequest
): Promise<PaymentInitiateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment initiation error:', error);
    return {
      success: false,
      message: 'Failed to connect to payment server',
      error,
    };
  }
}

/**
 * Check payment status
 */
export async function checkPaymentStatus(
  transactionId: string
): Promise<PaymentStatusResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/payment/status/${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment status check error:', error);
    return {
      success: false,
      paymentSuccess: false,
      transactionId,
      status: 'ERROR',
      message: 'Failed to check payment status',
    };
  }
}

/**
 * Biodata pricing configuration
 */
export const BIODATA_PRICING = {
  basic: {
    name: 'Basic',
    price: 49,
    description: 'Download your biodata in PDF format',
  },
  premium: {
    name: 'Premium',
    price: 99,
    description: 'All templates + HD quality + No watermark',
  },
};
