---
title: "선택 정렬(selection sort)에 대해 알아보자"
date: "2019-10-28T22:07:07.169Z"
template: "post"
draft: false
slug: "/algorithm/selection_sort/"
category: "algorithm"
tags:

- "algorithm"
- "selection sort"
- "sort"
description: "선택 정렬에 대해 알아보자"
---



> 가장 작은(큰) 숫자부터 골라 차례대로 정리하는 **선택 정렬**에 대해 알아보자.



1. [선택 정렬 과정](#선택-정렬-과정)
2. [선택 정렬 구현](#선택-정렬-구현-(python))
3. [선택 정렬 특징](#선택-정렬의-특징)
4. [선택 정렬 시간복잡도](#선택-정렬의-시간복잡도)





## 선택 정렬(selection sort) 알고리즘

- 가장 작은(큰) 숫자부터 골라서 차례대로 정리한다.
- 주어진 자료 중 가장 작은 값의 원소부터 차례대로 선택하여 위치를 교환.
- 비교와 교환 방식
- 교환의 횟수가 버블, 삽입 정렬보다 작다.



### 선택 정렬 과정

1. 주어진 리스트 중에서 최소값 찾기
2. 그 값을 맨 앞에 위치한 값과 교환
3. 맨 처음 위치를 제외한 나머지 리스트를 대상으로 위의 과정 반복

![img](img/Selection-Sort-Animation.gif)

<br>

<br>

### 선택 정렬 구현 (python)

```python
def selection_sort(data):
    for i in range(len(data)-1):
        min_index = i
        for j in range(i + 1, len(data)):
            if data[min_index] > data[j]:
                min_index = j
        if min_index != i:
            data[i], data[min_index] = data[min_index], data[i]

data = [4, 6, 3, 7, 8, 1, 9, 5, 2]
selection_sort(data)
print(data)
```



### 선택 정렬 구현 (C)

```c
#include <stdio.h>
void selection_sort(int arr[], int n) {
	int i, j, min_index, temp;
	for (i = 0; i < n - 1; i++) {
		min_index = i;
		for (j = i + 1; j < n; j++) {
			if (arr[min_index] > arr[j]) min_index = j;
		}
		if (i == min_index) continue;	// 최솟값이 제 위치에 있으면 변경 안함
		temp = arr[i];
		arr[i] = arr[min_index];
		arr[min_index] = temp;
	}
}
int main(void) {
	int data[9] = { 4, 6, 3, 7, 8, 1, 9, 5, 2 };
	int n = 9;
	selection_sort(data, n);

	for (int i = 0; i < n; i++) {
		printf("%d ", data[i]);
	}
	
	return 0;
}
```

<br>

<br>

### 선택 정렬의 특징

- 장점
  - 자료 이동 횟수가 미리 결정된다.
  - 삽입, 버블 정렬보다 교환 횟수가 적다.
  - 사용할 수 있는 메모리가 제한적인 경우 성능 상 이점이 있다.
- 단점
  - 안정성을 만족하지 않는다.
  - 즉, 값이 같은 레코드가 있는 경우에 상대적인 위치가 변경될 수 있다.

<br>

<br>

### 선택 정렬의 시간복잡도

- O(n^2) => 2중 for문
- 비교
  - n-1 + n-2 + ... + 2 + 1 = n(n-1)/2
- 교환
  - 한 번 교환 시 3번의 이동 (swap)
- T(n) = O(3n(n-2)/2) = **O(n^2)**









### Ref.

[위키백과 - 선택 정렬](<https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D_%EC%A0%95%EB%A0%AC>)

[Heee's Development Blog](<https://gmlwjd9405.github.io/2018/05/06/algorithm-selection-sort.html>)