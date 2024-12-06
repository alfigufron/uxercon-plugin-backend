export const DEFAULT_TABLE_COLUMNS = [
  {
    name: "created_at",
    type: "timestamp",
    default: "now()",
  },
  {
    name: "updated_at",
    type: "timestamp",
    default: "now()",
  },
  {
    name: "deleted_at",
    type: "timestamp",
    isNullable: true,
  },
];
