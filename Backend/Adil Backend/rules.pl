% Main inheritance calculator 
inheritance_calculator(TotalWealth, HasHusband, NumWives, NumSons, NumDaughters, NumSonsSons, NumSonsDaughters, NumSonsSonsDaughters, 
    NumSonsSonsSons, HasFather, HasMother, NumRealBrothers, NumRealSisters, NumPaternalBrothers, NumPaternalSisters, NumMaternalSiblings, 
    HasFathersFather, HasFathersMother, HasMothersMother, HusbandShare, PerWifeShare, PerSonShare, PerDaughterShare, PerSonsDaughterShare, 
    FatherShare, PerSonsSonsDaughterShare, MotherShare, FathersFatherShare, FathersMotherShare, MothersMotherShare, PerRealSisterShare, 
    PerPaternalSisterShare, PerMaternalSiblingShare, PerSonsSonShare, PerSonsSonsSonShare, PerRealBrotherShare, PerPaternalBrotherShare) :-
    % Step 1: Calculate fixed shares for husband/wives
    calculate_fixed_shares(TotalWealth, HasHusband, NumWives, NumSons, NumSonsSons, NumDaughters, NumSonsDaughters, HusbandShare, TotalWivesShare, RemainingWealth1),

    % Step 2: Calculate per wife share
    calculate_individual_share(TotalWivesShare, NumWives, PerWifeShare),

    % Step 3: Daughters if no sons are present
    (NumSons =:= 0, NumDaughters > 0 ->
        (NumDaughters =:= 1 ->  % Only 1 daughter
            DaughtersShare1 is RemainingWealth1 / 2  % She gets 1/2
        ;
            DaughtersShare1 is (RemainingWealth1 * 2 / 3)  % More than 1 daughter, they get 2/3
        ),
        SonsShare1 = 0
    ;
        DaughtersShare1 = 0,
        SonsShare1 = 0
    ),

    % Step 4: Son's daughter
    RemainingWealth2 is RemainingWealth1 - DaughtersShare1,
    ( (NumSons > 0; NumSonsSons > 0; NumDaughters >= 2) ->  % No share
        SonsDaughtersShare1 = 0
    ;
        (NumDaughters =:= 1 ->  % 1 daughter present
            SonsDaughtersShare1 is RemainingWealth2 / 6  % 1/6 share
        ;
            (NumSonsDaughters =:= 1 ->
                SonsDaughtersShare1 is RemainingWealth2 / 2  % 1/2 if only one son's daughter
            ;
                (NumSonsDaughters >= 2 ->
                    SonsDaughtersShare1 is (RemainingWealth2 * 2 / 3)  % 2/3 if two or more
                ;
                    SonsDaughtersShare1 = 0
                )
            )
        )
    ),

    RemainingWealth3 is RemainingWealth2 - SonsDaughtersShare1,

    % Step 5: Son's Son's Daughter
    ( (NumSonsSonsDaughters >= 2, NumSons =:= 0, NumDaughters =:= 0, NumSonsSons =:= 0, NumSonsDaughters =:= 0, NumSonsSonsSons =:= 0) ->
        SonsSonsDaughtersShare1 is RemainingWealth3 * 2 / 3  % 2/3 share
    ;
        ( (NumSonsSonsDaughters =:= 1, NumSons =:= 0, NumDaughters =:= 0, NumSonsSons =:= 0, NumSonsDaughters =:= 0, NumSonsSonsSons =:= 0) ->
            SonsSonsDaughtersShare1 is RemainingWealth3 / 2  % 1/2 share
        ;
            ( (NumDaughters =:= 1; NumSonsDaughters =:= 1), NumSons =:= 0, NumSonsSons =:= 0, NumSonsSonsSons =:= 0 ->
                SonsSonsDaughtersShare1 is RemainingWealth3 / 6  % 1/6 share
            ;
                SonsSonsDaughtersShare1 = 0  % No share otherwise
            )
        )
    ),

    RemainingWealth4 is RemainingWealth3 - SonsSonsDaughtersShare1,

    % Step 6: Father's Share
    (HasFather =:= 1 -> 
        ( (NumSons =:= 0, NumDaughters =:= 0, NumSonsSons =:= 0, NumSonsDaughters =:= 0) ->    % no children, no share
            FatherShare1 is 0
            ;
            FatherShare1 is RemainingWealth4 / 6
        )
    ;
        FatherShare1 is 0
    ),
    RemainingWealth5 is RemainingWealth4 - FatherShare1,

    % Step 7: Mother's Share
    (HasMother =:= 1 ->
        (((NumSons > 0 ; NumDaughters > 0 ; NumSonsSons > 0 ; NumSonsDaughters > 0) ;   % children condition
            (NumRealBrothers + NumRealSisters + NumPaternalBrothers + NumPaternalSisters + NumMaternalSiblings) >= 2 ;  % ikhwa condition
            (HasHusband =:= 1 , HasFather =:= 1)) ->
                MotherShare is RemainingWealth5 / 6
        ;
            ((NumWives > 0 , HasFather =:= 1) -> 
                MotherShare is RemainingWealth5 / 4
            ;
                MotherShare is RemainingWealth5 / 3 
            )
        )
    ;
        MotherShare is 0
    ),
    RemainingWealth6 is RemainingWealth5 - MotherShare,

    % Step 8: Father's Father Share
    (HasFathersFather=:=1 ->
        (((NumSons > 0 ; NumDaughters > 0 ; NumSonsSons > 0 ; NumSonsDaughters > 0) , (HasFather =:= 0)) ->   % children should be there and no father
        FathersFatherShare1 is RemainingWealth6 / 6
    ;
        FathersFatherShare1 is 0
    )
    ;
        FathersFatherShare1 is 0 
    ),
    RemainingWealth7 is RemainingWealth6 - FathersFatherShare1,


    % Step 9/10: Mothers Mother and Fathers Mother

    (HasFathersMother =:= 1, HasMother =:= 0, HasFather =:= 0 ->
    (HasMothersMother =:= 1, HasMother =:= 0 ->
        GrandmothersShare is RemainingWealth7 / 6,
        FathersMotherShare is GrandmothersShare / 2,
        MothersMotherShare is GrandmothersShare / 2
    ;
        FathersMotherShare is RemainingWealth7 / 6
    )
    ;
    FathersMotherShare is 0
    ),

    (HasMothersMother =:= 1, HasMother =:= 0, HasFathersMother =:= 0 ->
        MothersMotherShare is RemainingWealth7 / 6
    ;
    MothersMotherShare is 0
    ),

    RemainingWealth8 is RemainingWealth7 - FathersMotherShare - MothersMotherShare,


    % Step 11: Real Sister
    (NumRealSisters > 0, NumSons =:= 0, NumDaughters =:= 0, NumSonsSons =:= 0, NumSonsDaughters =:= 0, HasFather =:= 0, HasFathersFather =:= 0, NumRealBrothers =:= 0 ->
        (NumRealSisters =:= 1 ->
            RealSistersShare1 is RemainingWealth8 / 2
        ;
        RealSistersShare1 is RemainingWealth8 * 2 / 3
        )
    ;
    RealSistersShare1 is 0
),


    RemainingWealth9 is RemainingWealth8 - RealSistersShare1,


    % Step 12: Paternal Sister
    (NumPaternalSisters > 0 ->
    ( (NumSons > 0 ; NumDaughters > 0 ; NumSonsSons > 0 ; NumSonsDaughters > 0 ; HasFather > 0 ; HasFathersFather > 0 ; NumRealBrothers > 0 ; NumPaternalBrothers > 0) ->
        PaternalSistersShare1 is 0 
    ;
        (NumRealSisters =:= 1) ->
            ( (NumSons =:= 0, NumSonsSons =:= 0,NumDaughters =:= 0,NumSonsDaughters =:= 0, HasFather =:= 0, HasFathersFather =:= 0, NumRealBrothers =:= 0, NumPaternalBrothers =:= 0) ->
                PaternalSistersShare1 is RemainingWealth9 / 6 
            ;
                PaternalSistersShare1 is 0
            )
    ;
        (NumPaternalSisters =:= 1, NumRealSisters =:= 0) ->
            PaternalSistersShare1 is RemainingWealth9 / 2 
    ;
        (NumPaternalSisters > 1, NumRealSisters =:= 0) ->
            PaternalSistersShare1 is RemainingWealth9 * 2 / 3 
    ;
        PaternalSistersShare1 is 0 
        )
    ;
        PaternalSistersShare1 is 0 
    ),

    RemainingWealth10 is RemainingWealth9 - PaternalSistersShare1,


    %Step 13: Maternal Siblings
    (NumMaternalSiblings > 0 ->
        ((NumSons > 0 ; NumDaughters > 0 ; NumSonsSons > 0 ; NumSonsDaughters > 0 ; HasFather > 0 ; HasFathersFather > 0) ->
            MaternalSiblingShare is 0
            ;
            ((NumMaternalSiblings =:=1 )->
                MaternalSiblingShare is RemainingWealth10 / 6
                ;
                MaternalSiblingShare is RemainingWealth10 / 3
            )
        )
        ;
        MaternalSiblingShare is 0
    ),

    RemainingWealth11 is RemainingWealth10 - MaternalSiblingShare,
                                                                            % Residuary Shares

    % Step 14: Distribute remaining wealth among children if sons exist
    (NumSons > 0 ->
        calculate_children_shares(RemainingWealth11, NumSons, NumDaughters, FinalSonsShare, FinalDaughtersShare)
    ;
        FinalSonsShare = 0,
        FinalDaughtersShare = DaughtersShare1
    ),

    % Step 15: Sons_children
    (NumSons =:= 0, NumSonsSons > 0 -> 
        calculate_sons_children_shares(RemainingWealth11, NumSonsSons, NumSonsDaughters, FinalSonsSonsShare, FinalSonsDaughtersShare)
    ;   

        FinalSonsSonsShare = 0
    ),

    % Step 16: Sons_sons_children 
    (NumSons =:= 0, NumSonsSons =:= 0, NumSonsSonsSons > 0 -> 
        calculate_sons_sons_children_shares(RemainingWealth11, NumSonsSonsSons, NumSonsSonsDaughters, NumSonsDaughters, FinalSonsSonsSonsShare, FinalSonsSonsDaughtersShare, FinalSonsDaughtersShare)
    ;    
        FinalSonsSonsSonsShare = 0,
        FinalSonsSonsDaughtersShare = SonsSonsDaughtersShare1,
        FinalSonsDaughtersShare = SonsDaughtersShare1
    ),

    %Step 17: Father
    (HasFather =:= 1, NumSons =:= 0, NumSonsSons =:= 0, NumSonsSonsSons =:= 0 -> 
        FatherShare is RemainingWealth11 + FatherShare1
    ;
        FatherShare is FatherShare1
    ),

    %Step 18: FathersFather
    (HasFathersFather =:= 1, NumSons =:= 0, NumSonsSons =:= 0, NumSonsSonsSons =:= 0, HasFather=:= 0 -> 
        FathersFatherShare is RemainingWealth11 + FathersFatherShare1
    ;
        FathersFatherShare is FathersFatherShare1
    ),

    %Step 19: Real Siblings
    (NumRealBrothers > 0, HasFathersFather =:= 0, NumSons =:= 0, NumSonsSons =:= 0, NumSonsSonsSons =:= 0, HasFather=:= 0 -> 
        calculate_real_siblings_shares(RemainingWealth11,NumRealBrothers,NumRealSisters,FinalRealBrothersShare,FinalRealSistersShare)
    ;
        FinalRealBrothersShare is 0,
        FinalRealSistersShare is RealSistersShare1
    ),

    %Step 20: Real Sister
    (NumRealSisters > 0 ,RealSistersShare1=:= 0 ,NumRealBrothers =:= 0, HasFathersFather =:= 0, NumSons =:= 0, NumSonsSons =:= 0, NumSonsSonsSons =:= 0, HasFather=:= 0 ->
        calculate_real_sister_share(RemainingWealth11,NumRealSisters,FinalRealSistersShare)
        ;
        FinalRealSistersShare is RealSistersShare1
    ),

    %Step 21: Paternal Siblings
    (NumPaternalBrothers > 0, NumRealSisters =:= 0 ,NumRealBrothers =:= 0, HasFathersFather =:= 0, NumSons =:= 0, NumSonsSons =:= 0, NumSonsSonsSons =:= 0, HasFather=:= 0 ->
        calculate_paternal_siblings_shares(RemainingWealth11,NumPaternalBrothers,NumPaternalSisters,FinalPaternalBrothersShare,FinalPaternalSistersShare)
        ;
        FinalPaternalSistersShare is PaternalSistersShare1,
        FinalPaternalBrothersShare is 0
    ),

    % individual shares
    calculate_individual_share(FinalSonsShare, NumSons, PerSonShare),
    calculate_individual_share(FinalDaughtersShare, NumDaughters, PerDaughterShare),
    calculate_individual_share(FinalSonsSonsDaughtersShare, NumSonsSonsDaughters, PerSonsSonsDaughterShare),
    calculate_individual_share(FinalSonsSonsSonsShare, NumSonsSonsSons, PerSonsSonsSonShare),
    calculate_individual_share(FinalSonsDaughtersShare, NumSonsDaughters, PerSonsDaughterShare),
    calculate_individual_share(FinalSonsSonsShare, NumSonsSons, PerSonsSonShare),
    calculate_individual_share(FinalRealSistersShare, NumRealSisters, PerRealSisterShare),
    calculate_individual_share(FinalRealBrothersShare, NumRealBrothers, PerRealBrotherShare),
    calculate_individual_share(FinalPaternalSistersShare, NumPaternalSisters, PerPaternalSisterShare),
    calculate_individual_share(FinalPaternalBrothersShare, NumPaternalBrothers, PerPaternalBrotherShare),
    calculate_individual_share(MaternalSiblingShare, NumMaternalSiblings, PerMaternalSiblingShare).


% Calculate fixed shares for husband/wives and remaining wealth
calculate_fixed_shares(TotalWealth, HasHusband, NumWives, NumSons, NumSonsSons, NumDaughters, NumSonsDaughters, HusbandShare, TotalWivesShare, RemainingWealth) :-
    (HasHusband =:= 1 ->  % If husband is present
        (NumSons =:= 0, NumDaughters =:= 0, NumSonsSons =:= 0, NumSonsDaughters =:= 0 ->  % No children
            HusbandShare is TotalWealth / 2,  % Husband gets 1/2 if no children
            TotalWivesShare = 0,  % No wives if husband is present
            RemainingWealth is TotalWealth - HusbandShare
        ;
            HusbandShare is TotalWealth / 4,  % Husband gets 1/4 if children are present
            TotalWivesShare = 0,  % No wives if husband is present
            RemainingWealth is TotalWealth - HusbandShare
        )
    ;
        (NumWives > 0 ->  % If wives are present
            (NumSons =:= 0, NumDaughters =:= 0, NumSonsSons =:= 0, NumSonsDaughters =:= 0 ->  % No children
                TotalWivesShare is TotalWealth / 4,  % Wives get 1/4 if no children
                HusbandShare = 0,  % No husband
                RemainingWealth is TotalWealth - TotalWivesShare
            ;
                TotalWivesShare is TotalWealth / 8,  % Wives get 1/8 if children are present
                HusbandShare = 0,  % No husband
                RemainingWealth is TotalWealth - TotalWivesShare
            )
        ;
            % No husband or wives
            HusbandShare = 0,
            TotalWivesShare = 0,
            RemainingWealth = TotalWealth
        )
    ).

% Calculate shares for children
calculate_children_shares(TotalWealth, NumSons, NumDaughters, SonsShare, DaughtersShare) :-
    (NumSons > 0 ->
        TotalChildrenShares is NumSons * 2 + NumDaughters,  % Sons get 2 shares, daughters get 1
        SonsShare is TotalWealth * 2 / TotalChildrenShares * NumSons,
        DaughtersShare is TotalWealth / TotalChildrenShares * NumDaughters
    ;
        SonsShare = 0,
        DaughtersShare = 0
    ).

% Calculate individual shares
calculate_individual_share(TotalShare, Count, OneShare) :-
    (Count > 0 -> OneShare is TotalShare / Count ; OneShare = 0).

calculate_sons_children_shares(TotalWealth, NumSonsSons, NumSonsDaughters, SonsSonsShare, SonsDaughtersShare) :-
    (NumSonsSons > 0 ->
        TotalChildrenShares is NumSonsSons * 2 + NumSonsDaughters, 
        SonsSonsShare is TotalWealth * 2 / TotalChildrenShares * NumSonsSons,
        SonsDaughtersShare is TotalWealth / TotalChildrenShares * NumSonsDaughters
    ;
        SonsSonsShare = 0,
        SonsDaughtersShare = 0
    ).

calculate_sons_sons_children_shares(TotalWealth, NumSonsSonsSons, NumSonsSonsDaughters, NumSonsDaughters, SonsSonsSonsShare, SonsSonsDaughtersShare, SonsDaughtersShare) :-
    TotalFemales is NumSonsSonsDaughters + NumSonsDaughters,
    (NumSonsSonsSons > 0 ->
        TotalChildrenShares is NumSonsSonsSons * 2 + TotalFemales,
        SonsSonsSonsShare is TotalWealth * 2 / TotalChildrenShares * NumSonsSonsSons,
        SonsSonsDaughtersShare is TotalWealth / TotalChildrenShares * NumSonsSonsDaughters,
        SonsDaughtersShare is TotalWealth / TotalChildrenShares * NumSonsDaughters
    ;
        SonsSonsSonsShare = 0,
        SonsSonsDaughtersShare = 0,
        SonsDaughtersShare = 0
    ).

calculate_real_siblings_shares(TotalWealth, NumRealBrothers, NumRealSisters, RealBrothersShare, RealSistersShare) :-
    (NumRealBrothers > 0 ->
        TotalSiblingShares is NumRealBrothers * 2 + NumRealSisters, 
        RealBrothersShare is TotalWealth * 2 / TotalSiblingShares * NumRealBrothers,
        RealSistersShare is TotalWealth / TotalSiblingShares * NumRealSisters
    ;
        RealBrothersShare = 0,
        RealSistersShare = 0
    ).

calculate_real_sister_share(TotalWealth, NumRealSisters, RealSistersShare) :-
    RealSistersShare is TotalWealth.

calculate_paternal_siblings_shares(TotalWealth, NumPaternalBrothers, NumPaternalSisters, PaternalBrothersShare, PaternalSistersShare) :-
    (NumPaternalBrothers > 0 ->
        TotalSiblingShares is NumPaternalBrothers * 2 + NumPaternalSisters, 
        PaternalBrothersShare is TotalWealth * 2 / TotalSiblingShares * NumPaternalBrothers,
        PaternalSistersShare is TotalWealth / TotalSiblingShares * NumPaternalSisters
    ;
        PaternalBrothersShare = 0,
        PaternalSistersShare = 0
    ).

calculate_paternal_sister_share(TotalWealth, NumPaternalSisters, PaternalSistersShare) :-
    PaternalSistersShare is TotalWealth.


Has_Father(HasFather).