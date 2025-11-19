import { Button } from '@/components/ui/button';
import { BEAUTIFY_DIARY } from '@/graphql/queries';
import { BeautifyDiaryMutation } from '@/types/__generated__/graphql';
import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';

interface BeautifyPreviewProps {
  originalText: string;
  onApprove: (text: string) => void;
  onReject: () => void;
}

const BeautifyPreview: React.FC<BeautifyPreviewProps> = ({
  originalText,
  onApprove,
  onReject,
}) => {
  const [beautified, setBeautified] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [beautifyDiary] = useMutation<BeautifyDiaryMutation>(BEAUTIFY_DIARY, {
    onCompleted: (data) => {
      const text = data?.beautifyDiaryInput?.beautified;
      if (text) setBeautified(text);
      else setError('No beautified text returned.');
      setLoading(false);
    },
    onError: (err) => {
      setError(err.message);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!originalText) return;

    setLoading(true);
    setError('');

    beautifyDiary({
      variables: { content: originalText },
    });
  }, [originalText, beautifyDiary]);

  if (!originalText) return null;

  return (
    <div
      className="flex flex-col space-y-2 rounded-md border p-4"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <h3 className="text-sm font-semibold">AI Beautify Preview</h3>

      {loading && (
        <p className="text-muted-foreground text-sm">Generating preview...</p>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}

      {!loading && !error && (
        <p className="text-sm">{beautified || 'No preview available.'}</p>
      )}

      <div className="mt-2 ml-auto flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onReject()}
          disabled={loading}
        >
          Reject
        </Button>
        <Button
          size="sm"
          onClick={() => onApprove(beautified)}
          disabled={loading || !beautified}
        >
          Approve
        </Button>
      </div>
    </div>
  );
};

export default BeautifyPreview;
