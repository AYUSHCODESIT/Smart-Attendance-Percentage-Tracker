import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  ShieldCheck,
  Building,
  Smartphone,
  X,
  FileText,
} from 'lucide-react';
import { FeeItem, PaymentTransaction } from '../../types';

export const FeeManagementView: React.FC = () => {
  const { fees, payments, payFeeMock } = useApp();
  const [activePaymentFee, setActivePaymentFee] = useState<FeeItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentTransaction['method']>('Net Banking');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalFeeSum = fees.reduce((acc, f) => acc + f.totalAmount, 0);
  const totalPaidSum = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalDueSum = fees.reduce((acc, f) => acc + f.dueAmount, 0);

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePaymentFee) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      payFeeMock(activePaymentFee.id, activePaymentFee.dueAmount, paymentMethod);
      setTimeout(() => {
        setPaymentSuccess(false);
        setActivePaymentFee(null);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Institutional Finance & Academic Fee Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tuition fee schedules, payment receipts, outstanding balances, and clearance confirmation
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="p-2 rounded bg-white border border-slate-200 text-slate-600">
            Accounts Ref: <strong className="text-slate-900">ACC-2024-CS-0842</strong>
          </span>
        </div>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Semester Assessment
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            INR {totalFeeSum.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-400 mt-1">Tuition, Labs & Exam Fee</div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Cleared & Reconciled
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            INR {totalPaidSum.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-800 font-medium mt-1">Receipts verified on ledger</div>
        </div>

        <div
          className={`rounded-lg border p-4 shadow-xs bg-white ${
            totalDueSum > 0 ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
          }`}
        >
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Outstanding Balance Due
          </div>
          <div
            className={`text-2xl font-bold font-mono mt-1 ${
              totalDueSum > 0 ? 'text-rose-600' : 'text-slate-900'
            }`}
          >
            INR {totalDueSum.toLocaleString('en-IN')}
          </div>
          <div className="text-xs mt-1">
            {totalDueSum > 0 ? (
              <span className="text-rose-700 font-semibold">
                Clear dues prior to hall ticket issuance
              </span>
            ) : (
              <span className="text-emerald-700 font-medium">All financial dues settled</span>
            )}
          </div>
        </div>
      </div>

      {/* Fee Category Breakdown Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <h2 className="text-sm font-semibold text-slate-900">Semester 4 Fee Assessment Breakdown</h2>
          <p className="text-xs text-slate-500">Itemized statement of tuition, examination and campus facilities</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Fee Head / Description</th>
                <th className="py-3 px-3 text-right">Total Assessment</th>
                <th className="py-3 px-3 text-right">Amount Paid</th>
                <th className="py-3 px-3 text-right">Balance Due</th>
                <th className="py-3 px-3 text-center">Due Date</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">{fee.category}</td>
                  <td className="py-3 px-3 text-right font-mono font-semibold">
                    INR {fee.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-700">
                    INR {fee.paidAmount.toLocaleString('en-IN')}
                  </td>
                  <td
                    className={`py-3 px-3 text-right font-mono font-bold ${
                      fee.dueAmount > 0 ? 'text-rose-600' : 'text-slate-400'
                    }`}
                  >
                    INR {fee.dueAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-xs text-slate-500">
                    {fee.dueDate}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {fee.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                        <AlertCircle className="w-3 h-3" /> Due
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {fee.dueAmount > 0 ? (
                      <button
                        type="button"
                        onClick={() => setActivePaymentFee(fee)}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors"
                      >
                        Pay Online
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">Reconciled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Transactions History */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs space-y-2">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Transaction History & Receipts</h3>
            <p className="text-xs text-slate-500">Reconciled payment gateway transaction identifiers</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-4">Transaction Ref</th>
                <th className="py-2.5 px-4">Date & Time</th>
                <th className="py-2.5 px-4">Description</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-center">Payment Mode</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {payments.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{tx.transactionRef}</td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-xs">{tx.date}</td>
                  <td className="py-3 px-4 text-slate-800">{tx.description}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    INR {tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-xs">{tx.method}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Success
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Downloading payment receipt: ${tx.transactionRef}`)}
                      className="inline-flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 underline font-medium"
                    >
                      <Download className="w-3 h-3" />
                      <span>Receipt PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {activePaymentFee && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-md w-full p-6 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sky-600" />
                <h3 id="payment-modal-title" className="text-base font-semibold text-slate-900">
                  Campus Payment Gateway
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePaymentFee(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Transaction Approved</h4>
                <p className="text-xs text-slate-500">
                  Payment receipt generated and ledger balance cleared.
                </p>
              </div>
            ) : (
              <form onSubmit={handleExecutePayment} className="mt-4 space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Fee Item:</span>
                  <div className="font-semibold text-slate-900">{activePaymentFee.category}</div>
                  <div className="mt-2 flex items-baseline justify-between border-t border-slate-200 pt-2">
                    <span className="font-semibold text-slate-700">Amount Due:</span>
                    <span className="text-base font-mono font-bold text-slate-900">
                      INR {activePaymentFee.dueAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block font-semibold text-slate-700 mb-1.5">
                    Select Payment Instrument
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Net Banking', icon: Building },
                      { id: 'UPI', icon: Smartphone },
                      { id: 'Credit/Debit Card', icon: CreditCard },
                    ].map((inst) => {
                      const Icon = inst.icon;
                      return (
                        <button
                          key={inst.id}
                          type="button"
                          onClick={() => setPaymentMethod(inst.id as any)}
                          className={`p-2.5 rounded border text-center flex flex-col items-center justify-center gap-1 transition-colors ${
                            paymentMethod === inst.id
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[11px] font-medium">{inst.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-sky-50 border border-sky-100 text-[11px] text-sky-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
                  <span>256-bit TLS encrypted campus payment portal integration</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePaymentFee(null)}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-4 py-1.5 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-50"
                  >
                    {isProcessing ? 'Authorizing Payment...' : `Authorize INR ${activePaymentFee.dueAmount.toLocaleString('en-IN')}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
