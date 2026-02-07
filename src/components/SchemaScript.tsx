export const SchemaScript = ({
  scripts
}: {
  scripts: Array<{ id: string; json: unknown }>;
}) => {
  return scripts.map((script) => (
    <script
      key={script.id}
      id={script.id}
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: For JSON LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(script.json) }}
    />
  ));
};
