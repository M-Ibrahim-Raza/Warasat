"""
Test script for the inheritance calculator
"""

from inheritance_calculator import calculate_inheritance, InheritanceCalculator, HeirCounts

def test_sons_and_daughters():
    """Test case: 3 sons and 2 daughters sharing 1,000,000"""
    print("=" * 50)
    print("Test 1: 3 sons and 2 daughters")
    print("=" * 50)
    
    heirs = [
        {"relation": "son", "val": 3},
        {"relation": "daughter", "val": 2}
    ]
    
    result = calculate_inheritance(1000000, heirs)
    
    for heir in result:
        print(f"  {heir['relation']}: {heir['amount']:,.2f}")
    
    # Verify: 3 sons get 2 shares each = 6 shares, 2 daughters get 1 share each = 2 shares
    # Total = 8 shares, 1,000,000 / 8 = 125,000 per share
    # Son: 125,000 * 2 = 250,000 each
    # Daughter: 125,000 * 1 = 125,000 each
    total = sum(h["amount"] * h["val"] for h in result)
    print(f"  Total distributed: {total:,.2f}")
    print()

def test_husband_and_children():
    """Test case: Husband, 1 son, 2 daughters"""
    print("=" * 50)
    print("Test 2: Husband, 1 son, 2 daughters (wife deceased)")
    print("=" * 50)
    
    heirs = [
        {"relation": "husband", "val": 1},
        {"relation": "son", "val": 1},
        {"relation": "daughter", "val": 2}
    ]
    
    result = calculate_inheritance(1000000, heirs)
    
    for heir in result:
        if heir["amount"] > 0:
            print(f"  {heir['relation']}: {heir['amount']:,.2f}")
    
    # Husband gets 1/4 = 250,000 (when children exist)
    # Remaining 750,000 divided among son (2 shares) and daughters (1 share each)
    # Total shares = 2 + 2 = 4
    # Son: 750,000 * 2 / 4 = 375,000
    # Each Daughter: 750,000 * 1 / 4 = 187,500
    print()

def test_wife_and_parents():
    """Test case: Wife, Father, Mother (husband deceased with no children)"""
    print("=" * 50)
    print("Test 3: Wife, Father, Mother (no children)")
    print("=" * 50)
    
    heirs = [
        {"relation": "wife", "val": 1},
        {"relation": "father", "val": 1},
        {"relation": "mother", "val": 1}
    ]
    
    result = calculate_inheritance(1200000, heirs)
    
    for heir in result:
        if heir["amount"] > 0:
            print(f"  {heir['relation']}: {heir['amount']:,.2f}")
    
    # Wife gets 1/4 = 300,000 (no children)
    # Remaining 900,000
    # Mother gets 1/4 of remaining = 225,000 (wife present with father)
    # Father gets residue
    print()

def test_daughters_only():
    """Test case: 2 daughters only"""
    print("=" * 50)
    print("Test 4: 2 daughters only (no sons)")
    print("=" * 50)
    
    heirs = [
        {"relation": "daughter", "val": 2}
    ]
    
    result = calculate_inheritance(900000, heirs)
    
    for heir in result:
        if heir["amount"] > 0:
            print(f"  {heir['relation']}: {heir['amount']:,.2f} each")
    
    # 2+ daughters get 2/3 = 600,000 total = 300,000 each
    print()

def test_one_daughter():
    """Test case: 1 daughter only"""
    print("=" * 50)
    print("Test 5: 1 daughter only")
    print("=" * 50)
    
    heirs = [
        {"relation": "daughter", "val": 1}
    ]
    
    result = calculate_inheritance(1000000, heirs)
    
    for heir in result:
        if heir["amount"] > 0:
            print(f"  {heir['relation']}: {heir['amount']:,.2f}")
    
    # 1 daughter gets 1/2 = 500,000
    print()

def test_complex_case():
    """Test case: Multiple heirs"""
    print("=" * 50)
    print("Test 6: Complex case - Wife, 2 sons, 1 daughter, Mother")
    print("=" * 50)
    
    heirs = [
        {"relation": "wife", "val": 2},
        {"relation": "son", "val": 2},
        {"relation": "daughter", "val": 1},
        {"relation": "mother", "val": 1}
    ]
    
    result = calculate_inheritance(2400000, heirs)
    
    for heir in result:
        if heir["amount"] > 0:
            print(f"  {heir['relation']}: {heir['amount']:,.2f}")
    
    # Wives get 1/8 = 300,000 (with children) = 150,000 each
    # Mother gets 1/6 = 400,000 (with children)
    # Remaining = 2,400,000 - 300,000 - 400,000 = 1,700,000
    # 2 sons (4 shares) + 1 daughter (1 share) = 5 shares
    # Each son: 1,700,000 * 2 / 5 = 680,000
    # Daughter: 1,700,000 / 5 = 340,000
    print()

if __name__ == "__main__":
    test_sons_and_daughters()
    test_husband_and_children()
    test_wife_and_parents()
    test_daughters_only()
    test_one_daughter()
    test_complex_case()
    
    print("=" * 50)
    print("All tests completed!")
    print("=" * 50)

