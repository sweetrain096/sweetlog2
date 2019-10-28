---
title: "카운팅 정렬(counting sort)에 대해 알아보자"
date: "2019-10-28T22:40:39.169Z"
template: "post"
draft: false
slug: "/algorithm/counting_sort/"
category: "algorithm"
tags:

- "algorithm"
- "counting sort"
- "sort"
description: "카운팅 정렬에 대해 알아보자"
---



> 선형 시간에 정렬하는 **카운팅 정렬**에 대해 알아보자



1. [카운팅 정렬 과정](#카운팅-정렬-과정)
2. [카운팅 정렬 구현](#카운팅-정렬-구현-(python))
3. [카운팅 정렬 특징](#카운팅-정렬의-특징)
4. [카운팅 정렬 시간복잡도](#카운팅-정렬의-시간복잡도)





## 카운팅 정렬(counting sort) 알고리즘

- `계수 정렬`이라고 부른다.
- 항목들의 순서를 결정하기 위해 집합에 각 항목이 몇 개씩 있는지 세는 작업을 하여 선형 시간에 정렬하는 알고리즘
- data에서 각 항목들의 발생 횟수를 세고, 정수 항목들로 직접 인덱스 되는 카운트 배열 `count`에 저장한다.



### 카운팅 정렬 과정

1. `counting` 배열에, 주어진 `data` 의 각 요소 출현 횟수를 담는다.
2. `counting` 배열에서 누적 counting을 구한다.
3. `data`의 요소 값을 뒤에서부터 가져와 counting의 값으로 index를 찾고 새로운 빈 배열 `result`에 값을 요소 값을 넣는다. 이 때 누적 counting 값에서 -1을 해준다.

[카운팅 정렬 step별로 보기](<http://www.cs.miami.edu/home/burt/learning/Csc517.091/workbook/countingsort.html>)

위 링크에 들어가면 보다 쉽게 이해할 수 있다.

<br>

<br>

### 카운팅 정렬 구현 (python)

```python
def counting_sort(data, count, result):
    for i in data:
        count[i] += 1   # data 요소의 출현 횟수
    print("count", count)

    for i in range(len(count)-1):
        count[i+1] += count[i]  # 누적 count
    print("누적 count", count)

    for i in range(len(data)-1, -1, -1):
        result[count[data[i]] - 1] = data[i]
        count[data[i]] -= 1
        print("result", result, "count", count)



data = [3, 2, 5, 4, 2, 1, 5, 2, 2, 1]
count = [0 for _ in range(max(data)+1)]   # 최댓값
result = [0 for _ in range(len(data))]  # data 길이만큼
counting_sort(data, count, result)
print(result)
```

```
count [0, 2, 4, 1, 1, 2]
누적 count [0, 2, 6, 7, 8, 10]
result [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] count [0, 1, 6, 7, 8, 10]
result [0, 1, 0, 0, 0, 2, 0, 0, 0, 0] count [0, 1, 5, 7, 8, 10]
result [0, 1, 0, 0, 2, 2, 0, 0, 0, 0] count [0, 1, 4, 7, 8, 10]
result [0, 1, 0, 0, 2, 2, 0, 0, 0, 5] count [0, 1, 4, 7, 8, 9]
result [1, 1, 0, 0, 2, 2, 0, 0, 0, 5] count [0, 0, 4, 7, 8, 9]
result [1, 1, 0, 2, 2, 2, 0, 0, 0, 5] count [0, 0, 3, 7, 8, 9]
result [1, 1, 0, 2, 2, 2, 0, 4, 0, 5] count [0, 0, 3, 7, 7, 9]
result [1, 1, 0, 2, 2, 2, 0, 4, 5, 5] count [0, 0, 3, 7, 7, 8]
result [1, 1, 2, 2, 2, 2, 0, 4, 5, 5] count [0, 0, 2, 7, 7, 8]
result [1, 1, 2, 2, 2, 2, 3, 4, 5, 5] count [0, 0, 2, 6, 7, 8]
[1, 1, 2, 2, 2, 2, 3, 4, 5, 5]

```



### 카운팅 정렬 구현 (C)

```c
#include <stdio.h>

void counting_sort(int arr[], int count[], int result[], int len, int max) {
	int i;
	for (i = 0; i < len; i++) count[arr[i]]++;
	for (i = 1; i <= max; i++) count[i] += count[i - 1];
	for (i = len - 1; i >= 0; i--) {
		result[count[arr[i]] - 1] = arr[i];
		count[arr[i]]--;
	}
}
int main(void) {
	int data[10] = { 3, 2, 5, 4, 2, 1, 5, 2, 2, 1 };
	int count[6] = { 0, 0, 0, 0, 0, 0 };
	int result[10] = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
	int len = 10;
	int max = 5;
	
	counting_sort(data, count, result, len, max);
	
	for (int i = 0; i < len; i++) {
		printf("%d ", result[i]);
	}
	
	return 0;
}
```

<br>

<br>

### 카운팅 정렬의 특징

- 장점
  - 선형 시간에 정렬이 가능하다.
  - 정수로 표현할 수 있고, 값 사이의 차이가 크지 않을 경우 사용하기 좋다.
- 단점
  - 제한 사항이 많다.
  - 정수나, 정수로 표현할 수 있는 자료에 대해서만 적용 가능하다.
    - 각 항목의 발생 횟수를 기록해야 하기 때문에 정수로 인덱스 되는 카운트들의 배열을 사용한다.
  - 카운트를 위한 충분한 공간을 할당하기 위해서는 집합 내의 가장 큰 정수를 알아야한다.



<br>

<br>

### 카운팅 정렬의 시간복잡도

- O(n + k) : n은 리스트 길이, k는 정수의 최댓값.
- 리스트 길이만큼 돌아가는 for 가 두개 : O(2n)
- 만약 정수의 최댓값이 아주 커진다면 O(k)
- T(n) = **O(n + k)**









