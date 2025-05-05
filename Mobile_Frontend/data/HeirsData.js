// src/data/HeirsData.js
const heirs = [
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
  ];
  
  const common_heirs = heirs.filter((heir) =>
    heir["category"].includes("common")
  );
  
  const parent_heirs = heirs.filter((heir) =>
    heir["category"].includes("parent")
  );
  
  const parent_heirs_grouped = [
    [parent_heirs[0], parent_heirs[1], parent_heirs[4]],
    [parent_heirs[3], parent_heirs[2], parent_heirs[5]]
  ];
  
  const children_heirs = heirs.filter((heir) =>
    heir["category"].includes("children")
  );
  
  const children_heirs_grouped = [
    [children_heirs[0], children_heirs[2], children_heirs[4]],
    [children_heirs[1], children_heirs[3], children_heirs[5]]
  ];
  
  const sibling_heirs = heirs.filter((heir) =>
    heir["category"].includes("sibling")
  );
  
  const spouse_heir = heirs.filter((heir) =>
    heir["category"].includes("spouse")
  );
  
  const heir_types = ["Common Heirs", "Parents", "Children", "Siblings", "Spouse"];
  
  export {
    heirs,
    common_heirs,
    parent_heirs,
    children_heirs_grouped,
    sibling_heirs,
    spouse_heir,
    heir_types,
    parent_heirs_grouped
  };