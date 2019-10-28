---
title: "버블 정렬(bubble sort)에 대해 알아보자"
date: "2019-10-28T14:54:47.169Z"
template: "post"
draft: false
slug: "/algorithm/bubble_sort/"
category: "algorithm"
tags:
  - "algorithm"
  - "bubble sort"
  - "sort"
description: "버블 정렬에 대해 알아보자"
---

> 인접한 두 개의 원소를 비교하여 자리를 교환하는 **버블 정렬**에 대해 알아보자



1. [버블 정렬 과정](#버블-정렬-과정)
2. [버블 정렬 구현](#버블-정렬-구현-(python))
3. [버블 정렬 특징](#버블-정렬의-특징)
4. [버블 정렬 시간복잡도](#버블-정렬의-시간복잡도)





## 버블 정렬(bubble sort) 알고리즘

+ 인접한 두 개의 원소를 비교하여 자리를 계속 교환하는 방식
+ 단순 이동(move)이 아닌 교환(swap) 방식이다.
+ 비교와 교환 방식이다.



### 버블 정렬 과정

1. 첫 번째 원소부터 인접한 원소끼리 계속 자리를 교환하면서 정렬되지 않은 맨 마지막 자리까지 이동.
2. 한 단계가 끝나면 가장 큰 원소가 마지막 자리로 정렬.

<br>

<br>

### 버블 정렬 구현 (python)

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



### 버블 정렬 구현 (C)

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

### 버블 정렬의 특징

+ 장점
  + 구현이 간단하다
+ 단점
  + 하나의 요소가 가장 왼쪽에서 가장 오른쪽으로 이동하기 위해서는 배열에서 모든 다른 원소와 교환되어야한다.
  + 특정 요소가 최종 정렬 위치에 이미 있는 경우라도 교환되는 일이 일어난다.
+ 일반적으로 자료의 교환(swap)이 자료의 이동(move) 보다 복잡하기 때문에 거의 사용되지 않는다.

<br>

<br>

### 버블 정렬의 시간복잡도

+ O(n^2) => 2중 for문
+ 비교
  + n-1, n-2, ..., 2, 1번 = n(n-1) / 2
+ 교환
  + 입력 자료가 역순일 경우(==최악의 경우) 비교 횟수 3번
    + a 와 b 교환일 때, 
    + temp = a
    + a = b
    + b = temp
    + 위의 3번의 교환 횟수 필요
  + 입력 자료가 정렬되어 있는 경우 자료의 이동이 발생하지 않는다.
+ O(3n(n-1)/2) == **O(n^2)**











### Ref.

[Heee's Development Blog](<https://gmlwjd9405.github.io/2018/05/06/algorithm-bubble-sort.html>)