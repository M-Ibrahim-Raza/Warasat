export const common_heirs = [
    { relation: "son", val: 1, limit: 100 },
    { relation: "daughter", val: 1, limit: 100 },
    { relation: "father", val: 1, limit: 1 },
    { relation: "mother", val: 1, limit: 1 },
    { relation: "husband", val: 1, limit: 1 },
    { relation: "wife", val: 1, limit: 4 },
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
  