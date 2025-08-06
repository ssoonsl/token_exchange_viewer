import { useState } from "react";
import { TokenSelector } from "@components/TokenSelector/TokenSelector";
import { AmountInput } from "@components/AmountInput/AmountInput";
import { useGetTokenListQuery, useGetTokenPriceQuery } from "@store/api/tokensApi";
import type { Token } from "@/types";

export function SwapInterface() {
  const [sourceToken, setSourceToken] = useState<Token | null>(null);
  const [targetToken, setTargetToken] = useState<Token | null>(null);
  const [usdAmount, setUsdAmount] = useState<string>("");

  const {
    data: tokens = [],
    isLoading: tokensLoading,
    error: tokensError,
  } = useGetTokenListQuery();

  // Only fetch prices when we have tokens selected and USD amount
  const shouldFetchSourcePrice = sourceToken && usdAmount && parseFloat(usdAmount) > 0;
  const shouldFetchTargetPrice = targetToken && usdAmount && parseFloat(usdAmount) > 0;

  const { data: sourcePrice, isLoading: sourcePriceLoading } = useGetTokenPriceQuery(
    {
      address: sourceToken?.address ?? "",
      chainId: sourceToken?.chainId ?? 0,
    },
    { skip: !shouldFetchSourcePrice },
  );

  const { data: targetPrice, isLoading: targetPriceLoading } = useGetTokenPriceQuery(
    {
      address: targetToken?.address ?? "",
      chainId: targetToken?.chainId ?? 0,
    },
    { skip: !shouldFetchTargetPrice },
  );

  const calculateAmounts = () => {
    const usd = parseFloat(usdAmount);
    if (!usd || !sourcePrice || !targetPrice) return null;

    const sourceAmount = usd / sourcePrice.price;
    const targetAmount = usd / targetPrice.price;
    const exchangeRate = sourcePrice.price / targetPrice.price;

    return {
      usdAmount: usd,
      sourceAmount,
      targetAmount,
      exchangeRate,
    };
  };

  const calculations = calculateAmounts();
  const isCalculating = (sourcePriceLoading || targetPriceLoading) && parseFloat(usdAmount) > 0;

  const handleAmountChange = (value: string) => {
    setUsdAmount(value);
  };

  const validateAmount = (value: string): string | undefined => {
    if (!value) return undefined;

    const num = parseFloat(value);
    if (isNaN(num)) return "Please enter a valid number";
    if (num <= 0) return "Amount must be greater than 0";
    if (num > 1000000) return "Amount too large";

    return undefined;
  };

  const amountError = validateAmount(usdAmount);

  if (tokensError) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center text-red-600" data-testid="error-message">
          Failed to load tokens. Please check that the environment variables have been set
          correctly.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Token Swap</h1>
        <p className="text-gray-600 mt-1">Select tokens and enter USD amount</p>
      </div>

      <div>
        <AmountInput
          value={usdAmount}
          onChange={handleAmountChange}
          label="USD Amount"
          placeholder="Enter amount in USD"
          error={amountError}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">From Token</label>
        <TokenSelector
          tokens={tokens}
          selectedToken={sourceToken}
          onTokenSelect={setSourceToken}
          isLoading={tokensLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">To Token</label>
        <TokenSelector
          tokens={tokens}
          selectedToken={targetToken}
          onTokenSelect={setTargetToken}
          isLoading={tokensLoading}
        />
      </div>

      {(calculations || isCalculating) && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4" data-testid="swap-summary">
            Swap Summary
          </h3>

          {isCalculating ? (
            <div className="space-y-3">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : calculations ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">USD Amount:</span>
                <span className="font-medium">${calculations.usdAmount.toFixed(2)}</span>
              </div>

              {sourceToken && (
                <div className="flex justify-between" data-testid="source-amount">
                  <span className="text-gray-600">{sourceToken.symbol} Amount:</span>
                  <span className="font-medium">
                    {calculations.sourceAmount.toFixed(sourceToken.decimals === 18 ? 6 : 2)}
                  </span>
                </div>
              )}

              {targetToken && (
                <div className="flex justify-between" data-testid="target-amount">
                  <span className="text-gray-600">{targetToken.symbol} Amount:</span>
                  <span className="font-medium">
                    {calculations.targetAmount.toFixed(targetToken.decimals === 18 ? 6 : 2)}
                  </span>
                </div>
              )}

              {sourceToken && targetToken && (
                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>Exchange Rate:</span>
                  <span>
                    1 {sourceToken.symbol} = {calculations.exchangeRate.toFixed(6)}{" "}
                    {targetToken.symbol}
                  </span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {sourceToken &&
        targetToken &&
        usdAmount &&
        !amountError &&
        !calculations &&
        !isCalculating && (
          <div className="text-center text-gray-500 text-sm">
            Enter a valid amount to see calculations
          </div>
        )}

      {(!sourceToken || !targetToken) && (
        <div className="text-center text-gray-500 text-sm">
          Select both tokens to enable swap calculations
        </div>
      )}
    </div>
  );
}
