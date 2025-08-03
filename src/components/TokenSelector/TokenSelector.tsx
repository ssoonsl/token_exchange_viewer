import type { Token } from '@/types';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  isLoading?: boolean;
}

export function TokenSelector({ tokens, selectedToken, onTokenSelect, isLoading }: TokenSelectorProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {tokens.map((token) => (
        <button
          key={token.id}
          onClick={() => onTokenSelect(token)}
          className={`p-4 border rounded-lg text-left transition-colors hover:bg-gray-50 ${
            selectedToken?.id === token.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200'
          }`}
          data-testid={`token-card-${token.id}`}
        >
          <div className="font-medium text-gray-900">{token.symbol}</div>
          <div className="text-sm text-gray-500">{token.name}</div>
          <div className="text-xs text-gray-400 mt-1">
            Chain {token.chainId}
          </div>
        </button>
      ))}
    </div>
  );
}