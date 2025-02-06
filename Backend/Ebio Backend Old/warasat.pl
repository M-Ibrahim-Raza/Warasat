%name(ibrahim).

son(dp,s1).

son(s1,ss2).

son_son(X,Y):-son(X,A),son(A,Y).

%father.

%father_father.

%father_father_father.

%father_mother.

%mother.

%mother_mother.

%husband.

%wife(1).
%wife(2).
%wife(3).
%wife(4).

%son(1).
%son(2).
%son(3).
%son(4).
%son(5).

%daughter(1).
%daughter(2).
%daughter(3).
%daughter(4).
%daughter(5).

%son_son(1).
%son_son(2).
%son_son(3).
%son_son(4).
%son_son(5).

%son_daughter(1).
%son_daughter(2).
%son_daughter(3).
%son_daughter(4).
%son_daughter(5).

%son_son_son(1).
%son_son_son(2).
%son_son_son(3).
%son_son_son(4).
%son_son_son(5).

%son_son_daughter(1).
%son_son_daughter(2).
%son_son_daughter(3).
%son_son_daughter(4).
%son_son_daughter(5).

%real_brother(1).
%real_brother(2).
%real_brother(3).
%real_brother(4).
%real_brother(5).

%real_sister(1).
%real_sister(2).
%real_sister(3).
%real_sister(4).
%real_sister(5).

%paternal_brother(1).
%paternal_brother(2).
%paternal_brother(3).
%paternal_brother(4).
%paternal_brother(5).

%paternal_sister(1).
%paternal_sister(2).
%paternal_sister(3).
%paternal_sister(4).
%paternal_sister(5).

%maternal_sibling(1).
%maternal_sibling(2).
%maternal_sibling(3).
%maternal_sibling(4).
%maternal_sibling(5).

children:-current_predicate(son/1);current_predicate(son_son/1);current_predicate(son_son_son/1);current_predicate(daughter/1);current_predicate(son_daughter/1);current_predicate(son_son_daughter/1).

% Check Predicates Return 0 or False If Predicates are Not Defined

check_real_brother(X):-(current_predicate(real_brother/1)->real_brother(X);X is 0).

check_real_sister(X):-(current_predicate(real_sister/1)->real_sister(X);X is 0).

check_paternal_brother(X):-(current_predicate(paternal_brother/1)->paternal_brother(X);X is 0).

check_paternal_sister(X):-(current_predicate(paternal_sister/1)->paternal_sister(X);X is 0).

check_maternal_sibling(X):-(current_predicate(maternal_sibling/1)->maternal_sibling(X);X is 0).

siblings_count(X):-check_real_brother(A),check_real_sister(B),check_paternal_brother(C),check_paternal_sister(D),check_maternal_sibling(E),X is A+B+C+D+E.

ikhwa:-siblings_count(X),X>=2.

% Share Rules

father_share(X):-current_predicate(father/0),children,X is 1/6.

mother_share(X):-(\+current_predicate(mother/0)->false;
                 (children;ikhwa;(current_predicate(husband/0),current_predicate(father/0)))->X is 1/6;
                 current_predicate(wife/1),current_predicate(father/0)->X is 1/4;X is 1/3).

father_father_share(X):-(current_predicate(father_father/0),(current_predicate(father/0),X is 0);(children,X is 1/6)).

father_mother_share(X):-(current_predicate(father_mother/0),(((current_predicate(father/0);current_predicate(mother/0)),X is 0);
                      (current_predicate(mother_mother/0),\+current_predicate(mother/0),X is 1/12);
          (X is 1/6))).

mother_mother_share(X):-(current_predicate(mother_mother/0),((current_predicate(mother/0),X is 0);(father_mother_share(Y),Y =:=1/12,X is 1/12);(X is 1/6))).

husband_share(X):-(current_predicate(husband/0),children->X is 1/4;current_predicate(husband/0)->X is 1/2).

wife_share(X):-(current_predicate(wife/1),children->X is 1/8;current_predicate(wife/1)->X is 1/4).

daughter_share(X):-(\+current_predicate(son/1),current_predicate(daughter/1),daughter(1)->X is 1/2;\+current_predicate(son/1),current_predicate(daughter/1),daughter(Y),Y>=2->X is 2/3).

son_daughter_share(X):-(\+current_predicate(son_daughter/1)->false;(current_predicate(son/1);(current_predicate(daughter/1),daughter(Y),Y>=2))->X is 0;
                       \+current_predicate(son/1),\+current_predicate(daughter/1),\+current_predicate(son_son/1),current_predicate(son_daughter/1),son_daughter(1)->X is 1/2;
                       \+current_predicate(son/1),\+current_predicate(daughter/1),\+current_predicate(son_son/1),current_predicate(son_daughter/1),son_daughter(Y),Y>=2->X is 2/3;
                       \+current_predicate(son/1),\+current_predicate(son_son/1),current_predicate(daughter/1),current_predicate(son_daughter/1),daughter(1)->X is 1/6).

son_son_daughter_share(X):-
    (\+current_predicate(son_son_daughter/1)->false;(current_predicate(son/1);current_predicate(son_son/1);(current_predicate(daughter/1),daughter(Y),Y>=2);(current_predicate(son_daughter/1),son_daughter(Y),Y>=2);(current_predicate(daughter/1),daughter(1),(current_predicate(son_daughter/1),son_daughter(1))))->X is 0;
    \+current_predicate(son/1),\+current_predicate(daughter/1),\+current_predicate(son_son/1),\+current_predicate(son_daughter/1),\+current_predicate(son_son_son/1),current_predicate(son_son_daughter/1),son_son_daughter(1)->X is 1/2;
    \+current_predicate(son/1),\+current_predicate(daughter/1),\+current_predicate(son_son/1),\+current_predicate(son_daughter/1),\+current_predicate(son_son_son/1),current_predicate(son_son_daughter/1),son_son_daughter(Y),Y >= 2->X is 2/3;
    \+current_predicate(son/1),
    \+current_predicate(son_son/1),
    \+current_predicate(son_son_son/1),
    current_predicate(son_son_daughter/1),
    ((\+current_predicate(son_daughter/1),current_predicate(daughter/1),daughter(1));(\+current_predicate(daughter/1),current_predicate(son_daughter/1),son_daughter(1)))
    ->X is 1/6).

maternal_sibling_share(X):-current_predicate(maternal_sibling/1)fdsdfsfdfdsds

d(,.



