---
title: "삽입 정렬(insertion sort)에 대해 알아보자"
date: "2019-10-28T17:04:24.169Z"
template: "post"
draft: false
slug: "/algorithm/insertion_sort/"
category: "algorithm"
tags:

- "algorithm"
- "insertion sort"
- "sort"
  description: "삽입 정렬에 대해 알아보자"

---



> 책 정리과 같은 방식으로 정리하는 **삽입 정렬**에 대해 알아보자.



1. [버블 정렬 과정](버블 정렬 과정)
2. [버블 정렬 구현](버블 정렬 구현 (python))
3. [버블 정렬 특징](버블 정렬의 특징)
4. [버블 정렬 시간복잡도](버블 정렬의 시간복잡도)





## 삽입 정렬(insertion sort) 알고리즘

- 책을 순서대로 정렬하는 방법과 유사.
  - 정렬되어 있는 책 사이의 올바른 자리를 찾아 삽입한다.
  - 새로 삽입될 카드의 수만큼 반복. 전체 카드가 정렬된다.
- 자료 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교하여, 자신의 위치를 찾아 삽입함으로써 정렬을 완성하는 알고리즘.
- k번째 반복 후의 결과 배열은, 앞쪽 k + 1 항목이 정렬된 상태



### 삽입 정렬 과정

1. k번째 요소가 이미 정렬된 배열에서의 알맞은 자리를 찾는다.
2. 알맞은 자리부터 k-1번째 요소까지 한칸씩 뒤로 민 후 알맞은 자리에 k 번째 요소를 삽입한다.



![Array prior to the insertion of x](img/Insertionsort-before.png)

각 반복에서 정렬되지 않은 나머지 부분 중 첫 번째 항목은 제거되어 정확한 위치에 삽입된다. 그러므로 다음과 같은 결과가 된다.

![Array after the insertion of x](img/Insertionsort-after.png)



![img](img/Insertion_sort_001.PNG)

<br>

<br>

### 삽입 정렬 구현 (python)

```python
def bubble_sort(data):
    for i in range(len(data) - 1, 0, -1):
        print(len(data)-i, "turn")
        for j in range(i):
            if data[j] > data[j + 1]:
                data[j], data[j + 1] = data[j + 1], data[j]  # swap
                print(f"{data} index {j}, {j+1} swap")
            else:
                print(data)

data = [2, 4, 1, 3, 5]
bubble_sort(data)
print(data)
```

```
1 turn
[2, 4, 1, 3, 5]
[2, 1, 4, 3, 5] index 1, 2 swap
[2, 1, 3, 4, 5] index 2, 3 swap
[2, 1, 3, 4, 5]
2 turn
[1, 2, 3, 4, 5] index 0, 1 swap
[1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]
3 turn
[1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]
4 turn
[1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]
```



### 삽입 정렬 구현 (C)

```c
#include <stdio.h>

void bubble_sort(int arr[], int n) {
	int temp;
	for (int i = n-1; i > 0; i--) {
		for (int j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
}

int main(void) {
	int data[5] = { 2, 4, 1, 3, 5 };
	int n = 5;
	bubble_sort(data, n);
	for (int i = 0; i < n; i++) {
		printf("%d ", data[i]);
	}
	return 0;
}
```

<br>

<br>

### 삽입 정렬의 특징

- 장점
  - 구현이 간단하다
- 단점
  - 하나의 요소가 가장 왼쪽에서 가장 오른쪽으로 이동하기 위해서는 배열에서 모든 다른 원소와 교환되어야한다.
  - 특정 요소가 최종 정렬 위치에 이미 있는 경우라도 교환되는 일이 일어난다.
- 일반적으로 자료의 교환(swap)이 자료의 이동(move) 보다 복잡하기 때문에 거의 사용되지 않는다.

<br>

<br>

### 버블 정렬의 시간복잡도

- O(n^2) => 2중 for문
- 비교
  - n-1, n-2, ..., 2, 1번 = n(n-1) / 2
- 교환
  - 입력 자료가 역순일 경우(==최악의 경우) 비교 횟수 3번
    - a 와 b 교환일 때, 
    - temp = a
    - a = b
    - b = temp
    - 위의 3번의 교환 횟수 필요
  - 입력 자료가 정렬되어 있는 경우 자료의 이동이 발생하지 않는다.
- O(3n(n-1)/2) == **O(n^2)**











### Ref.

[위키백과 - 삽입 정렬](https://ko.wikipedia.org/wiki/삽입_정렬)

[Heee's Development Blog](<https://gmlwjd9405.github.io/2018/05/06/algorithm-insertion-sort.html>)