export function commentMapper(data: any) {
  return data.map((d: any) => {
    return {
      text: d.commentaire ? d.commentaire : "N/A",
      created_at: d.created_at ? d.created_at : "N/A",
      id: d.id ? d.id : "N/A",
    };
  });
}
