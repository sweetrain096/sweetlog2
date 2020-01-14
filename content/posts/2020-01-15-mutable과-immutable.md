---
title: "mutable과 immutable"
date: "2020-01-15T00:19:07.169Z"
template: "post"
draft: false
slug: "/python/mutable_vs_immutable"
category: "python"
tags:
  - "mutable"
  - "immutable"
  - "python"
description: "python에서 mutable(뮤터블)과 immutable(이뮤터블)에 대해서 알아보자"

---



> python에서 mutable(뮤터블)과 immutable(이뮤터블)에 대해서 알아보자



1. [mutable(뮤터블)](mutable뮤터블)
2. [immutable(이뮤터블)](immutable이뮤터블)
3. [mutable과 immutable](mutable과-immutable)
4. [mutable을 사용하는 이유? immutable을 사용하는 이유?](mutable을-사용하는-이유?-immutable을-사용하는-이유?)



## mutable과 immutable

면접에서 많이 묻는 질문 중에 하나이고, python을 배운다면 tuple과 list의 차이를 배우면서 접하게 될 개념이다. 각 언어마다 약간의 차이가 존재할 수는 있지만, 기본적인 개념은 거의 동일할 것으로 생각된다.



### mutable(뮤터블)

+ 변경이 가능한 객체
+ 최초 생성 이후에 자유롭게 값의 변경, 추가, 삭제 등이 가능하다.
+ 예시
  + int, float 등의 기본 변수.
  + list
  + 사용자 정의 클래스

<br>



### immutable(이뮤터블)

+ 변경이 불가능한 객체
+ 최초 생성 이후에 값을 변경할 수 없다.
+ 예시
  + tuple
  + string
  + dictionary - key
  + 이 외에 내장 타입인 숫자, 불리언 등이 포함된다.



<br>

### mutable과 immutable

일반적으로 mutable(뮤터블)한 객체들은 `=` 으로 값을 재정의 할 수 있다. 

```python
num = 1
print(num)

num = 2
print(num)
```

```
1
2
```

위와 같이 값을 변경할 수 있다.



그럼 다음을 보자.

```python
string = "abc"
print(string)
string = "hi"
print(string)
```

```
abc
hi
```

`=` 으로 값을 변경할 수 있다. 그러면 string이 mutable한가? 그것은 **아니다.**



string 과 tuple이 immutable한 이유는 아래와 같다.

```python
string = "abc"
print(string)
string[-1] = "z"
print(string)
```

```
Traceback (most recent call last):
abc
  File "C:/Users/.../mutable_immutable.py", line 14, in <module>
    string[-1] = "z"
TypeError: 'str' object does not support item assignment
```

python은 위에서부터 한줄씩 실행되는 `인터프리터 언어`이기 때문에 abc를 출력한 후 에러메세지를 띄운다. str 객체에는 특정 아이템의 할당이 불가능 하다는 type 에러이다.

tuple로 보아도 같은 결과를 보인다.

```python
tuple_test = (1, 2, 3)
print(tuple_test)
tuple_test[0] = 10
print(tuple_test)
```

```
(1, 2, 3)
Traceback (most recent call last):
  File "C:/.../mutable_immutable.py", line 19, in <module>
    tuple_test[0] = 10
TypeError: 'tuple' object does not support item assignment
```



위에 반해 mutable한 list는 값을 변경해도 제대로 작동한다.

```python
arr = [1, 2, 3]
print(arr)
arr[0] = 10
print(arr)
```

```
[1, 2, 3]
[10, 2, 3]
```



이 특징은 dictionary에서도 재미있게 작용하는데, dictionary의 key에는 immutable한 형식만이 들어갈 수 있고, value는 이와 관계없이 들어갈 수 있다. 

```python
dictionary = dict()
dictionary["q"] = (1, 2, 3)
print(dictionary)
dictionary[1] = "1입니다"
print(dictionary)
dictionary[[1, 2, 3]] = 1
print(dictionary)
```

```
{'q': (1, 2, 3)}
Traceback (most recent call last):
{'q': (1, 2, 3), 1: '1입니다'}
  File "C:/.../mutable_immutable.py", line 32, in <module>
    dictionary[[1, 2, 3]] = 1
TypeError: unhashable type: 'list'
```

여기서 mutable한 list를 key로 넣으려고 하자 type에러가 발생한다. 이는, dictionary의 특성이기도 한데, 사전에서 찾아야 할 단어가 바뀔 수는 없으나, 쪽수는 바뀔 수 있다는 것으로 생각하면 될 것이다.

추가로 `1`은 int로 key가 될 수 없지 않을까? 하는 생각을 할 수도 있는데, **1은 number**이다. 파이썬 내장 타입인 number이며, immutable한 성질을 가지고있다.



<br>

### mutable을 사용하는 이유? immutable을 사용하는 이유?

각 타입의 장단점이 존재하며 익숙치 않을 때에는 편한 타입을 사용하는 것이 언어를 습득할 때에는 좋을 수 있다. 그러나 dictionary와 같은 경우 immutable 오브젝트를 사용해야하기 때문에 개념을 확실히 잡아두는 것은 중요하다.

<br>



mutable을 사용하는 이유는 값 조작의 편의성에 있다.

랜덤하게 들어온 숫자들의 정렬이라던가 내가 만든 클래스라던가 값의 변형과 조작을 편하게 할 수 있다.



<br>

immutable을 사용하는 이유는 변화하지 않을 값의 보호에 있다.

특정 x, y, z 벡터로 이동해야 하는 점이 존재할 경우 벡터 값의 변경이 일어나서는 안된다. 이러한 경우 튜플로 값을 지정한다. <del>물론 이 경우에도 x, y, z를 클래스로 다루는 것이 더 좋을 수 있다. 또는 namedtuple을 사용하는 것이 나을 것이다.</del>

위에서 설명한것과 같이 dictionary의 경우에도 immutable로 key를 설정한다.

여기서 추가로 *args로 변수를 넘길 때에도 tuple 형식이 사용된다. <del>이 경우에는 들어오는 순서에 대해 확실한 보장을 해야 하기 때문에 사용되는 것이라고 생각된다.</del>

<br>



그럼, mutable과 immutable 중 어느것이 더 빠를까?

<u>일반적으로는 mutable이 더 빠르다.</u>

```python
arr = [1, 2, 3]
arr[0] = 100
print(arr)

string = "abc"
string.replace("a", "z")
print(string)
string = string.replace("a", "z")
print(string)
```

```
[100, 2, 3]
abc
zbc
```

list의 경우 특정 위치의 요소를 변경하는것에 문제가 없고, 또한 변경한 내용을 arr에 따로 넣어주지 않아도 자동으로 값이 변경된다.

그러나 아래 string의 경우 문자열 `abc`를 replace 함수로 변경한 후 print 했을 때 변경되지 않았다. 아래와 같이 string에 다시 넣어주어야만 값이 변경된다.

이 차이점 때문에 속도에서 차이가 나게 된다. 

**mutable한 객체는 특정 요소가 변경**되지만, **immutable한 객체는 값이 새로 생성**되는 것이다. 특정 부분을 치환하는 것과 전체를 복사하여 특정 부분만 다른 새로운 객체를 만드는 것과의 시간 차이는 분명히 존재한다.

 <br>

<br>

다양한 이야기를 다루다 보니 내용이 좀 많아졌다. 처음 글을 작성하기 시작한 것은 같이 교육을 받았던 동기 중에 tuple과 list를 활용한 버그를 발견했다는 카톡 때문이었는데 이 글을 작성하면서 다시 한 번 둘의 내용을 정리할 수 있는 좋은 기회였다.

<br>

<br>

<br>

