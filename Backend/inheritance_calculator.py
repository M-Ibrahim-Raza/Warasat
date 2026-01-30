"""
Islamic Inheritance Calculator - Python Implementation

This module implements Islamic inheritance (Warasat) calculation rules,
translated from the Prolog rules in Backend/Adil Backend/rules.pl

The calculation follows these principles:
- Fixed shares (Fard) are distributed first to entitled heirs
- Remaining wealth goes to residuary heirs (Asaba)
- Male heirs typically receive double the share of female heirs at same level
"""

from dataclasses import dataclass
from typing import Dict, Optional


@dataclass
class HeirCounts:
    """Counts of each type of heir"""
    has_husband: int = 0
    num_wives: int = 0
    num_sons: int = 0
    num_daughters: int = 0
    num_sons_sons: int = 0
    num_sons_daughters: int = 0
    num_sons_sons_sons: int = 0
    num_sons_sons_daughters: int = 0
    has_father: int = 0
    has_mother: int = 0
    has_fathers_father: int = 0
    has_fathers_mother: int = 0
    has_mothers_mother: int = 0
    num_real_brothers: int = 0
    num_real_sisters: int = 0
    num_paternal_brothers: int = 0
    num_paternal_sisters: int = 0
    num_maternal_siblings: int = 0


@dataclass
class InheritanceShares:
    """Calculated shares for each heir type"""
    husband_share: float = 0.0
    per_wife_share: float = 0.0
    per_son_share: float = 0.0
    per_daughter_share: float = 0.0
    per_sons_son_share: float = 0.0
    per_sons_daughter_share: float = 0.0
    per_sons_sons_son_share: float = 0.0
    per_sons_sons_daughter_share: float = 0.0
    father_share: float = 0.0
    mother_share: float = 0.0
    fathers_father_share: float = 0.0
    fathers_mother_share: float = 0.0
    mothers_mother_share: float = 0.0
    per_real_brother_share: float = 0.0
    per_real_sister_share: float = 0.0
    per_paternal_brother_share: float = 0.0
    per_paternal_sister_share: float = 0.0
    per_maternal_sibling_share: float = 0.0


# Mapping from relation names to HeirCounts attributes
RELATION_MAP = {
    "son": "num_sons",
    "daughter": "num_daughters",
    "father": "has_father",
    "mother": "has_mother",
    "husband": "has_husband",
    "wife": "num_wives",
    "son's son": "num_sons_sons",
    "son's daughter": "num_sons_daughters",
    "father's father": "has_fathers_father",
    "father's mother": "has_fathers_mother",
    "mother's mother": "has_mothers_mother",
    "real brother": "num_real_brothers",
    "real sister": "num_real_sisters",
    "paternal brother": "num_paternal_brothers",
    "paternal sister": "num_paternal_sisters",
    "maternal sibling": "num_maternal_siblings",
    "son's son's son": "num_sons_sons_sons",
    "son's son's daughter": "num_sons_sons_daughters",
}

# Mapping from share attribute names to relation names
SHARE_MAP = {
    "husband_share": "husband",
    "per_wife_share": "wife",
    "per_son_share": "son",
    "per_daughter_share": "daughter",
    "per_sons_son_share": "son's son",
    "per_sons_daughter_share": "son's daughter",
    "per_sons_sons_son_share": "son's son's son",
    "per_sons_sons_daughter_share": "son's son's daughter",
    "father_share": "father",
    "mother_share": "mother",
    "fathers_father_share": "father's father",
    "fathers_mother_share": "father's mother",
    "mothers_mother_share": "mother's mother",
    "per_real_brother_share": "real brother",
    "per_real_sister_share": "real sister",
    "per_paternal_brother_share": "paternal brother",
    "per_paternal_sister_share": "paternal sister",
    "per_maternal_sibling_share": "maternal sibling",
}


class InheritanceCalculator:
    """
    Islamic Inheritance Calculator
    
    Implements the 21-step calculation process for distributing
    inheritance according to Islamic law (Sharia).
    """
    
    def __init__(self, total_wealth: float, heirs: HeirCounts):
        self.total_wealth = total_wealth
        self.heirs = heirs
        self.shares = InheritanceShares()
        
        # Intermediate values for tracking remaining wealth
        self._remaining_wealth = total_wealth
        
        # Intermediate share values before final calculation
        self._daughters_share1 = 0.0
        self._sons_daughters_share1 = 0.0
        self._sons_sons_daughters_share1 = 0.0
        self._father_share1 = 0.0
        self._fathers_father_share1 = 0.0
        self._real_sisters_share1 = 0.0
        self._paternal_sisters_share1 = 0.0
        self._maternal_sibling_share = 0.0
    
    def calculate(self) -> InheritanceShares:
        """
        Main calculation method - executes all 21 steps
        """
        # Step 1-2: Calculate fixed shares for husband/wives
        remaining1 = self._calculate_spouse_shares()
        
        # Step 3: Daughters share (if no sons)
        remaining2 = self._calculate_daughters_share(remaining1)
        
        # Step 4: Son's daughters share
        remaining3 = self._calculate_sons_daughters_share(remaining2)
        
        # Step 5: Son's son's daughters share
        remaining4 = self._calculate_sons_sons_daughters_share(remaining3)
        
        # Step 6: Father's share
        remaining5 = self._calculate_father_share(remaining4)
        
        # Step 7: Mother's share
        remaining6 = self._calculate_mother_share(remaining5)
        
        # Step 8: Father's father share
        remaining7 = self._calculate_fathers_father_share(remaining6)
        
        # Step 9-10: Grandmothers share
        remaining8 = self._calculate_grandmothers_share(remaining7)
        
        # Step 11: Real sisters share
        remaining9 = self._calculate_real_sisters_share(remaining8)
        
        # Step 12: Paternal sisters share
        remaining10 = self._calculate_paternal_sisters_share(remaining9)
        
        # Step 13: Maternal siblings share
        remaining11 = self._calculate_maternal_siblings_share(remaining10)
        
        # Steps 14-21: Residuary shares
        self._calculate_residuary_shares(remaining11)
        
        return self.shares
    
    def _calculate_individual_share(self, total_share: float, count: int) -> float:
        """Calculate per-person share"""
        return total_share / count if count > 0 else 0.0
    
    def _has_children(self) -> bool:
        """Check if deceased has any children or grandchildren"""
        return (self.heirs.num_sons > 0 or 
                self.heirs.num_daughters > 0 or 
                self.heirs.num_sons_sons > 0 or 
                self.heirs.num_sons_daughters > 0)
    
    def _has_male_descendants(self) -> bool:
        """Check if there are any male descendants"""
        return (self.heirs.num_sons > 0 or 
                self.heirs.num_sons_sons > 0 or 
                self.heirs.num_sons_sons_sons > 0)
    
    # Step 1-2: Spouse shares
    def _calculate_spouse_shares(self) -> float:
        """
        Calculate fixed shares for husband or wives
        Returns remaining wealth after spouse shares
        """
        has_children = self._has_children()
        
        if self.heirs.has_husband == 1:
            # Husband gets 1/2 if no children, 1/4 if children present
            if not has_children:
                self.shares.husband_share = self.total_wealth / 2
            else:
                self.shares.husband_share = self.total_wealth / 4
            return self.total_wealth - self.shares.husband_share
        
        elif self.heirs.num_wives > 0:
            # Wives collectively get 1/4 if no children, 1/8 if children present
            if not has_children:
                total_wives_share = self.total_wealth / 4
            else:
                total_wives_share = self.total_wealth / 8
            
            self.shares.per_wife_share = self._calculate_individual_share(
                total_wives_share, self.heirs.num_wives
            )
            return self.total_wealth - total_wives_share
        
        return self.total_wealth
    
    # Step 3: Daughters share
    def _calculate_daughters_share(self, remaining_wealth: float) -> float:
        """
        Calculate daughters' share when no sons are present
        - 1 daughter gets 1/2
        - 2+ daughters get 2/3 collectively
        """
        if self.heirs.num_sons == 0 and self.heirs.num_daughters > 0:
            if self.heirs.num_daughters == 1:
                self._daughters_share1 = remaining_wealth / 2
            else:
                self._daughters_share1 = remaining_wealth * 2 / 3
        
        return remaining_wealth - self._daughters_share1
    
    # Step 4: Son's daughters share
    def _calculate_sons_daughters_share(self, remaining_wealth: float) -> float:
        """
        Calculate son's daughters share
        - Blocked if sons, son's sons, or 2+ daughters exist
        - Gets 1/6 if 1 daughter present
        - Gets 1/2 if only 1 son's daughter (no daughters)
        - Gets 2/3 if 2+ son's daughters (no daughters)
        """
        h = self.heirs
        
        # Blocked conditions
        if h.num_sons > 0 or h.num_sons_sons > 0 or h.num_daughters >= 2:
            self._sons_daughters_share1 = 0
        elif h.num_daughters == 1:
            # 1/6 share when 1 daughter present
            self._sons_daughters_share1 = remaining_wealth / 6
        elif h.num_sons_daughters == 1:
            self._sons_daughters_share1 = remaining_wealth / 2
        elif h.num_sons_daughters >= 2:
            self._sons_daughters_share1 = remaining_wealth * 2 / 3
        else:
            self._sons_daughters_share1 = 0
        
        return remaining_wealth - self._sons_daughters_share1
    
    # Step 5: Son's son's daughters share
    def _calculate_sons_sons_daughters_share(self, remaining_wealth: float) -> float:
        """
        Calculate son's son's daughters share
        """
        h = self.heirs
        
        # 2+ son's son's daughters with no higher male/female descendants
        if (h.num_sons_sons_daughters >= 2 and 
            h.num_sons == 0 and h.num_daughters == 0 and 
            h.num_sons_sons == 0 and h.num_sons_daughters == 0 and 
            h.num_sons_sons_sons == 0):
            self._sons_sons_daughters_share1 = remaining_wealth * 2 / 3
        
        # 1 son's son's daughter with no higher descendants
        elif (h.num_sons_sons_daughters == 1 and 
              h.num_sons == 0 and h.num_daughters == 0 and 
              h.num_sons_sons == 0 and h.num_sons_daughters == 0 and 
              h.num_sons_sons_sons == 0):
            self._sons_sons_daughters_share1 = remaining_wealth / 2
        
        # 1/6 if one daughter or one son's daughter exists
        elif ((h.num_daughters == 1 or h.num_sons_daughters == 1) and 
              h.num_sons == 0 and h.num_sons_sons == 0 and h.num_sons_sons_sons == 0):
            self._sons_sons_daughters_share1 = remaining_wealth / 6
        
        else:
            self._sons_sons_daughters_share1 = 0
        
        return remaining_wealth - self._sons_sons_daughters_share1
    
    # Step 6: Father's share
    def _calculate_father_share(self, remaining_wealth: float) -> float:
        """
        Calculate father's share
        - Gets 1/6 if children/grandchildren exist
        - Gets residue if no male descendants (calculated later)
        """
        h = self.heirs
        
        if h.has_father == 1:
            # Father gets 1/6 fixed share if children exist
            if self._has_children():
                self._father_share1 = remaining_wealth / 6
            else:
                self._father_share1 = 0  # Will get residue later
        else:
            self._father_share1 = 0
        
        return remaining_wealth - self._father_share1
    
    # Step 7: Mother's share
    def _calculate_mother_share(self, remaining_wealth: float) -> float:
        """
        Calculate mother's share
        - 1/6 if children exist or 2+ siblings (ikhwa condition)
        - 1/4 if wife present with father
        - 1/3 otherwise
        """
        h = self.heirs
        
        if h.has_mother != 1:
            self.shares.mother_share = 0
            return remaining_wealth
        
        has_children = self._has_children()
        total_siblings = (h.num_real_brothers + h.num_real_sisters + 
                         h.num_paternal_brothers + h.num_paternal_sisters + 
                         h.num_maternal_siblings)
        
        # 1/6 conditions
        if (has_children or 
            total_siblings >= 2 or 
            (h.has_husband == 1 and h.has_father == 1)):
            self.shares.mother_share = remaining_wealth / 6
        
        # 1/4 if wife present with father
        elif h.num_wives > 0 and h.has_father == 1:
            self.shares.mother_share = remaining_wealth / 4
        
        # 1/3 otherwise
        else:
            self.shares.mother_share = remaining_wealth / 3
        
        return remaining_wealth - self.shares.mother_share
    
    # Step 8: Father's father share
    def _calculate_fathers_father_share(self, remaining_wealth: float) -> float:
        """
        Calculate father's father (grandfather) share
        - Gets 1/6 if children exist and father is not present
        """
        h = self.heirs
        
        if h.has_fathers_father == 1:
            # Children should exist and no father
            if self._has_children() and h.has_father == 0:
                self._fathers_father_share1 = remaining_wealth / 6
            else:
                self._fathers_father_share1 = 0
        else:
            self._fathers_father_share1 = 0
        
        return remaining_wealth - self._fathers_father_share1
    
    # Step 9-10: Grandmothers share
    def _calculate_grandmothers_share(self, remaining_wealth: float) -> float:
        """
        Calculate grandmothers (father's mother and mother's mother) share
        - Each gets 1/6 if mother not present
        - If both present, they share 1/6 equally
        - Father's mother blocked if father is present
        """
        h = self.heirs
        
        fathers_mother_share = 0.0
        mothers_mother_share = 0.0
        
        # Father's mother (blocked if mother or father present)
        if h.has_fathers_mother == 1 and h.has_mother == 0 and h.has_father == 0:
            if h.has_mothers_mother == 1:
                # Both grandmothers present - share 1/6 equally
                grandmothers_share = remaining_wealth / 6
                fathers_mother_share = grandmothers_share / 2
                mothers_mother_share = grandmothers_share / 2
            else:
                fathers_mother_share = remaining_wealth / 6
        
        # Mother's mother alone (blocked if mother present)
        if h.has_mothers_mother == 1 and h.has_mother == 0 and h.has_fathers_mother == 0:
            mothers_mother_share = remaining_wealth / 6
        
        self.shares.fathers_mother_share = fathers_mother_share
        self.shares.mothers_mother_share = mothers_mother_share
        
        return remaining_wealth - fathers_mother_share - mothers_mother_share
    
    # Step 11: Real sisters share
    def _calculate_real_sisters_share(self, remaining_wealth: float) -> float:
        """
        Calculate real sisters share as fixed share
        - Blocked if children, father, grandfather, or real brothers exist
        - 1 sister gets 1/2
        - 2+ sisters get 2/3 collectively
        """
        h = self.heirs
        
        blocking_conditions = (
            h.num_sons > 0 or h.num_daughters > 0 or
            h.num_sons_sons > 0 or h.num_sons_daughters > 0 or
            h.has_father == 1 or h.has_fathers_father == 1 or
            h.num_real_brothers > 0
        )
        
        if h.num_real_sisters > 0 and not blocking_conditions:
            if h.num_real_sisters == 1:
                self._real_sisters_share1 = remaining_wealth / 2
            else:
                self._real_sisters_share1 = remaining_wealth * 2 / 3
        else:
            self._real_sisters_share1 = 0
        
        return remaining_wealth - self._real_sisters_share1
    
    # Step 12: Paternal sisters share
    def _calculate_paternal_sisters_share(self, remaining_wealth: float) -> float:
        """
        Calculate paternal sisters share
        """
        h = self.heirs
        
        if h.num_paternal_sisters <= 0:
            self._paternal_sisters_share1 = 0
            return remaining_wealth
        
        # Blocking conditions
        blocking = (h.num_sons > 0 or h.num_daughters > 0 or 
                   h.num_sons_sons > 0 or h.num_sons_daughters > 0 or
                   h.has_father > 0 or h.has_fathers_father > 0 or
                   h.num_real_brothers > 0 or h.num_paternal_brothers > 0)
        
        if blocking:
            self._paternal_sisters_share1 = 0
        elif h.num_real_sisters == 1:
            # 1/6 when one real sister exists
            if (h.num_sons == 0 and h.num_sons_sons == 0 and 
                h.num_daughters == 0 and h.num_sons_daughters == 0 and
                h.has_father == 0 and h.has_fathers_father == 0 and
                h.num_real_brothers == 0 and h.num_paternal_brothers == 0):
                self._paternal_sisters_share1 = remaining_wealth / 6
            else:
                self._paternal_sisters_share1 = 0
        elif h.num_paternal_sisters == 1 and h.num_real_sisters == 0:
            self._paternal_sisters_share1 = remaining_wealth / 2
        elif h.num_paternal_sisters > 1 and h.num_real_sisters == 0:
            self._paternal_sisters_share1 = remaining_wealth * 2 / 3
        else:
            self._paternal_sisters_share1 = 0
        
        return remaining_wealth - self._paternal_sisters_share1
    
    # Step 13: Maternal siblings share
    def _calculate_maternal_siblings_share(self, remaining_wealth: float) -> float:
        """
        Calculate maternal siblings share
        - Blocked if children, father, or grandfather exist
        - 1 sibling gets 1/6
        - 2+ siblings get 1/3 collectively
        """
        h = self.heirs
        
        if h.num_maternal_siblings <= 0:
            self._maternal_sibling_share = 0
            return remaining_wealth
        
        # Blocking conditions
        blocking = (h.num_sons > 0 or h.num_daughters > 0 or
                   h.num_sons_sons > 0 or h.num_sons_daughters > 0 or
                   h.has_father > 0 or h.has_fathers_father > 0)
        
        if blocking:
            self._maternal_sibling_share = 0
        elif h.num_maternal_siblings == 1:
            self._maternal_sibling_share = remaining_wealth / 6
        else:
            self._maternal_sibling_share = remaining_wealth / 3
        
        return remaining_wealth - self._maternal_sibling_share
    
    # Steps 14-21: Residuary shares
    def _calculate_residuary_shares(self, remaining_wealth: float) -> None:
        """
        Distribute remaining wealth to residuary heirs (Asaba)
        Sons and male descendants take residue with 2:1 ratio vs females
        """
        h = self.heirs
        
        # Step 14: Sons with daughters (2:1 ratio)
        if h.num_sons > 0:
            final_sons_share, final_daughters_share = self._calculate_children_shares(
                remaining_wealth, h.num_sons, h.num_daughters
            )
            self.shares.per_son_share = self._calculate_individual_share(
                final_sons_share, h.num_sons
            )
            self.shares.per_daughter_share = self._calculate_individual_share(
                final_daughters_share, h.num_daughters
            )
        else:
            # Daughters already got their fixed share
            self.shares.per_daughter_share = self._calculate_individual_share(
                self._daughters_share1, h.num_daughters
            )
        
        # Step 15: Son's sons with son's daughters
        final_sons_sons_share = 0.0
        final_sons_daughters_share = self._sons_daughters_share1
        
        if h.num_sons == 0 and h.num_sons_sons > 0:
            final_sons_sons_share, final_sons_daughters_share = self._calculate_children_shares(
                remaining_wealth, h.num_sons_sons, h.num_sons_daughters
            )
        
        self.shares.per_sons_son_share = self._calculate_individual_share(
            final_sons_sons_share, h.num_sons_sons
        )
        
        # Step 16: Son's son's sons with related females
        final_sons_sons_sons_share = 0.0
        final_sons_sons_daughters_share = self._sons_sons_daughters_share1
        
        if h.num_sons == 0 and h.num_sons_sons == 0 and h.num_sons_sons_sons > 0:
            # Calculate shares for son's son's sons with son's daughters and son's son's daughters
            total_females = h.num_sons_sons_daughters + h.num_sons_daughters
            if h.num_sons_sons_sons > 0:
                total_shares = h.num_sons_sons_sons * 2 + total_females
                final_sons_sons_sons_share = remaining_wealth * 2 / total_shares * h.num_sons_sons_sons
                final_sons_sons_daughters_share = remaining_wealth / total_shares * h.num_sons_sons_daughters
                final_sons_daughters_share = remaining_wealth / total_shares * h.num_sons_daughters
        
        self.shares.per_sons_sons_son_share = self._calculate_individual_share(
            final_sons_sons_sons_share, h.num_sons_sons_sons
        )
        self.shares.per_sons_sons_daughter_share = self._calculate_individual_share(
            final_sons_sons_daughters_share, h.num_sons_sons_daughters
        )
        self.shares.per_sons_daughter_share = self._calculate_individual_share(
            final_sons_daughters_share, h.num_sons_daughters
        )
        
        # Step 17: Father gets residue if no male descendants
        if (h.has_father == 1 and h.num_sons == 0 and 
            h.num_sons_sons == 0 and h.num_sons_sons_sons == 0):
            self.shares.father_share = remaining_wealth + self._father_share1
        else:
            self.shares.father_share = self._father_share1
        
        # Step 18: Father's father gets residue
        if (h.has_fathers_father == 1 and h.num_sons == 0 and 
            h.num_sons_sons == 0 and h.num_sons_sons_sons == 0 and 
            h.has_father == 0):
            self.shares.fathers_father_share = remaining_wealth + self._fathers_father_share1
        else:
            self.shares.fathers_father_share = self._fathers_father_share1
        
        # Step 19: Real siblings as residuary
        final_real_brothers_share = 0.0
        final_real_sisters_share = self._real_sisters_share1
        
        if (h.num_real_brothers > 0 and h.has_fathers_father == 0 and 
            h.num_sons == 0 and h.num_sons_sons == 0 and 
            h.num_sons_sons_sons == 0 and h.has_father == 0):
            final_real_brothers_share, final_real_sisters_share = self._calculate_siblings_shares(
                remaining_wealth, h.num_real_brothers, h.num_real_sisters
            )
        
        # Step 20: Real sisters get residue if alone
        if (h.num_real_sisters > 0 and self._real_sisters_share1 == 0 and
            h.num_real_brothers == 0 and h.has_fathers_father == 0 and
            h.num_sons == 0 and h.num_sons_sons == 0 and
            h.num_sons_sons_sons == 0 and h.has_father == 0):
            final_real_sisters_share = remaining_wealth
        
        self.shares.per_real_brother_share = self._calculate_individual_share(
            final_real_brothers_share, h.num_real_brothers
        )
        self.shares.per_real_sister_share = self._calculate_individual_share(
            final_real_sisters_share, h.num_real_sisters
        )
        
        # Step 21: Paternal siblings as residuary
        final_paternal_brothers_share = 0.0
        final_paternal_sisters_share = self._paternal_sisters_share1
        
        if (h.num_paternal_brothers > 0 and h.num_real_sisters == 0 and
            h.num_real_brothers == 0 and h.has_fathers_father == 0 and
            h.num_sons == 0 and h.num_sons_sons == 0 and
            h.num_sons_sons_sons == 0 and h.has_father == 0):
            final_paternal_brothers_share, final_paternal_sisters_share = self._calculate_siblings_shares(
                remaining_wealth, h.num_paternal_brothers, h.num_paternal_sisters
            )
        
        self.shares.per_paternal_brother_share = self._calculate_individual_share(
            final_paternal_brothers_share, h.num_paternal_brothers
        )
        self.shares.per_paternal_sister_share = self._calculate_individual_share(
            final_paternal_sisters_share, h.num_paternal_sisters
        )
        
        # Maternal siblings per-person share
        self.shares.per_maternal_sibling_share = self._calculate_individual_share(
            self._maternal_sibling_share, h.num_maternal_siblings
        )
    
    def _calculate_children_shares(
        self, total_wealth: float, num_sons: int, num_daughters: int
    ) -> tuple[float, float]:
        """
        Calculate shares for children with 2:1 ratio (sons:daughters)
        Returns (sons_total_share, daughters_total_share)
        """
        if num_sons > 0:
            total_shares = num_sons * 2 + num_daughters
            sons_share = total_wealth * 2 / total_shares * num_sons
            daughters_share = total_wealth / total_shares * num_daughters
            return sons_share, daughters_share
        return 0.0, 0.0
    
    def _calculate_siblings_shares(
        self, total_wealth: float, num_brothers: int, num_sisters: int
    ) -> tuple[float, float]:
        """
        Calculate shares for siblings with 2:1 ratio (brothers:sisters)
        Returns (brothers_total_share, sisters_total_share)
        """
        if num_brothers > 0:
            total_shares = num_brothers * 2 + num_sisters
            brothers_share = total_wealth * 2 / total_shares * num_brothers
            sisters_share = total_wealth / total_shares * num_sisters
            return brothers_share, sisters_share
        return 0.0, 0.0


def calculate_inheritance(total_wealth: float, heir_list: list[dict]) -> list[dict]:
    """
    Main function to calculate inheritance shares
    
    Args:
        total_wealth: Total distributable wealth
        heir_list: List of heir dictionaries with 'relation' and 'val' keys
    
    Returns:
        Updated heir_list with 'amount' key added to each heir
    """
    # Build HeirCounts from heir_list
    heirs = HeirCounts()
    
    for heir in heir_list:
        relation = heir.get("relation", "")
        val = heir.get("val", 0)
        
        if relation in RELATION_MAP:
            attr_name = RELATION_MAP[relation]
            setattr(heirs, attr_name, val)
    
    # Calculate shares
    calculator = InheritanceCalculator(total_wealth, heirs)
    shares = calculator.calculate()
    
    # Map shares back to heir_list
    share_to_relation = {v: k for k, v in SHARE_MAP.items()}
    
    for heir in heir_list:
        relation = heir.get("relation", "")
        if relation in share_to_relation:
            share_attr = share_to_relation[relation]
            heir["amount"] = getattr(shares, share_attr, 0.0)
        else:
            heir["amount"] = 0.0
    
    return heir_list

