import { Card, Button } from "@heroui/react";

export function HistoryBanrisulBankGenerate({ history }: { history: any[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Lịch sử tạo hóa đơn</h3>
      {history.length === 0 && (
        <p className="text-gray-500">Chưa có lịch sử.</p>
      )}
      {history.map((item, idx) => (
        <Card key={idx} className="mb-4">
          <div className="p-4 space-y-2">
            <div className="font-medium">
              {`#${history.length - idx} - ${item.message}`}
            </div>
            <div className="text-sm text-gray-500">
              Thời gian: {new Date(item.timestamp).toLocaleString()}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button
                as="a"
                color="primary"
                href={item.zip_download_url}
                rel="noopener noreferrer"
                size="sm"
                target="_blank"
                variant="solid"
              >
                Tải tất cả (.zip)
              </Button>
              {item.files.map((f: any, i: number) => (
                <Button
                  key={i}
                  as="a"
                  className="!no-underline"
                  color="secondary"
                  href={f.file_url}
                  rel="noopener noreferrer"
                  size="sm"
                  target="_blank"
                >
                  {f.file}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
