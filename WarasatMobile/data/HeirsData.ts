export const common_heirs = [
  { relation: "son", category: ["common", "children"], limit: 99 },
  { relation: "daughter", category: ["common", "children"], limit: 99 },
  { relation: "father", category: ["common", "parent"], limit: 1 },
  { relation: "mother", category: ["common", "parent"], limit: 1 },
  { relation: "husband", category: ["common", "spouse"], limit: 1 },
  { relation: "wife", category: ["common", "spouse"], limit: 4 },
  { relation: "son's son", category: ["common", "children"], limit: 99 },
  { relation: "son's daughter", category: ["common", "children"], limit: 99 },
  { relation: "father's father", category: ["common", "parent"], limit: 1 },
  { relation: "father's mother", category: ["common", "parent"], limit: 1 },
  { relation: "mother's mother", category: ["common", "parent"], limit: 1 },
  { relation: "real brother", category: ["common", "sibling"], limit: 99 },
  { relation: "real sister", category: ["common", "sibling"], limit: 99 },
  { relation: "paternal brother", category: ["common", "sibling"], limit: 99 },
  { relation: "paternal sister", category: ["common", "sibling"], limit: 99 },
  {
    relation: "maternal sibling",
    category: ["common", "sibling"],
    limit: 99,
  },
  { relation: "son's son's son", category: ["children"], limit: 99 },
  { relation: "son's son's daughter", category: ["children"], limit: 99 },
  { relation: "father's father's father", category: ["parent"], limit: 1 },
  ]
  
  export const parent_heirs_grouped = [
    [
      { relation: "father", val: 1, limit: 1 },
      { relation: "mother", val: 1, limit: 1 },
    ],
    [
      { relation: "father's father", val: 1, limit: 1 },
      { relation: "father's mother", val: 1, limit: 1 },
    ],
    [{ relation: "mother's mother", val: 1, limit: 1 }],
  ]
  
  export const children_heirs_grouped = [
    [
      { relation: "son", val: 1, limit: 100 },
      { relation: "daughter", val: 1, limit: 100 },
    ],
    [
      { relation: "son's son", val: 1, limit: 100 },
      { relation: "son's daughter", val: 1, limit: 100 },
    ],
  ]
  
  export const sibling_heirs = [
    { relation: "real brother", val: 1, limit: 100 },
    { relation: "real sister", val: 1, limit: 100 },
    { relation: "paternal brother", val: 1, limit: 100 },
    { relation: "paternal sister", val: 1, limit: 100 },
    { relation: "maternal sibling", val: 1, limit: 100 },
  ]
  
  export const spouse_heir = [
    { relation: "husband", val: 1, limit: 1 },
    { relation: "wife", val: 1, limit: 4 },
  ]
  
  export const heir_types = ["Common Heirs", "Parents", "Children", "Siblings", "Spouse"]
  