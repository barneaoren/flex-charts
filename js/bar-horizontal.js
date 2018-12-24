flexCharts.prototype.barChartHorizontal = function(options) {
	this.options = options || {};
	this.data = options.data || [];
	this.labels = options.labels || [];
	this.categories = options.categories || [];
	this.colors = this.options.colors || this.defaults.colors;
	this.target = $('#' + this.options.id)[0];
	this.stacks = [];
	this.clear = function() {
		this.target.innerHTML = "";
		if (this.target.classList) {
			while (this.target.classList.length > 0) {
				this.target.classList.remove(this.target.classList.item(0));
			}			
		}
	};
	
	this.draw = function() {
		this.clear();
		this.target.classList.add("flex-charts-bar-horizontal");
		this.target.style.width = this.options.width || this.defaults.width;
		this.target.style.height = this.options.height || this.defaults.height;	
		
		var chart = document.createElement("div");
		chart.style.width = '100%';
		chart.style.height = this.labels ? "calc(100% - 20px)" : '100%';
		chart.classList.add('flex-charts-bar-horizontal-container');
		var maxStackHeight = 0;
		var categoriesRelativeHeight = [];
		var stacksAbsoluteHeight = this.data.map(function(stackData) {
			var currStackHeight = 0;
			stackData.map(function(barData) {
				currStackHeight += barData;
			});
			
			
			categoriesRelativeHeight.push(stackData.map(function(categoryData) {
				return Math.ceil(100 * categoryData / currStackHeight);
			}));
			maxStackHeight = Math.max(maxStackHeight, currStackHeight);
			return currStackHeight;
		});
		var stacksRelativeHeight = stacksAbsoluteHeight.map(function (stackAbsoluteHeight) {
			return Math.floor(100 * stackAbsoluteHeight / maxStackHeight);
		});
		
		this.stacks = [];
		for (var stackIndex = 0; stackIndex < this.data.length; stackIndex++) {
			var currentStackPointers = {}
			this.stacks.push(currentStackPointers);
			var stack = document.createElement("div");
			currentStackPointers.stack = stack;
			currentStackPointers.categories = [];
			stack.classList.add('flex-charts-bar-horizontal-stack');
			stack.style.height = stacksRelativeHeight[stackIndex] + "%";
			var tooltip = document.createElement("div");
			tooltip.classList.add("flex-charts-tooltip");
			for (var categoryIndex = 0; categoryIndex < this.data[stackIndex].length; categoryIndex++) {
				var category = document.createElement("div");
				category.style.height = categoriesRelativeHeight[stackIndex][categoryIndex] + "%";
				category.style.backgroundColor = this.colors[categoryIndex % this.colors.length];
				category.classList.add('flex-charts-bar-horizontal-bar');
				stack.appendChild(category);
				
				var tooltipItem = document.createElement("div");
				tooltipItem.classList.add("flex-charts-tooltip-item");
				var tooltipItemText = document.createElement("div");
				tooltipItemText.classList.add("flex-charts-tooltip-item-text");
				tooltipItemText.innerHTML = this.categories[categoryIndex] + ": " + this.data[stackIndex][categoryIndex];
				var tooltipItemCat = document.createElement("div");
				tooltipItemCat.classList.add("flex-charts-tooltip-item-category");
				tooltipItemCat.style.backgroundColor = this.colors[categoryIndex % this.colors.length];
				tooltipItem.appendChild(tooltipItemCat);
				tooltipItem.appendChild(tooltipItemText);
				tooltip.appendChild(tooltipItem);
				currentStackPointers.categories.push({
					bar: category,
					tooltip: tooltipItemText
				})
			}
			stack.appendChild(tooltip);
			chart.appendChild(stack);
			
		}
		this.target.appendChild(chart);
		
		// add gridlines
		for (var perc = 20; perc < 100; perc+=20) {
			var grid = document.createElement("div");	
			grid.classList.add("flex-charts-bar-horizontal-grid");
			grid.style.bottom = perc + "%";
			this.target.appendChild(grid);
		}
		
		// add labels
		if (this.labels) {
			var labels = document.createElement("div");
			labels.classList.add("flex-charts-bar-horizontal-labels");
			for (var labelIndex = 0; labelIndex < this.data.length; labelIndex++) {
				var label = document.createElement("div");
				label.innerHTML = this.labels[labelIndex];
				label.setAttribute("title", this.labels[labelIndex]);
				label.classList.add("flex-charts-bar-horizontal-label");
				labels.appendChild(label);
			}
			this.target.appendChild(labels);
		}
	};
	
	this.update = function(data) {
		this.data = data;
		var maxStackHeight = 0;
		var categoriesRelativeHeight = [];
		var stacksAbsoluteHeight = this.data.map(function(stackData) {
			var currStackHeight = 0;
			stackData.map(function(barData) {
				currStackHeight += barData;
			});
			
			
			categoriesRelativeHeight.push(stackData.map(function(categoryData) {
				return Math.ceil(100 * categoryData / currStackHeight);
			}));
			maxStackHeight = Math.max(maxStackHeight, currStackHeight);
			return currStackHeight;
		});
		var stacksRelativeHeight = stacksAbsoluteHeight.map(function (stackAbsoluteHeight) {
			return Math.floor(100 * stackAbsoluteHeight / maxStackHeight);
		});
		
		for (var stackIndex = 0; stackIndex < this.stacks.length; stackIndex++) {
			for (var categoryIndex = 0; categoryIndex < this.stacks[stackIndex].categories.length; categoryIndex++) {
				this.stacks[stackIndex].stack.style.height = stacksRelativeHeight[stackIndex] + "%";
				this.stacks[stackIndex].categories[categoryIndex].bar.style.height = categoriesRelativeHeight[stackIndex][categoryIndex] + "%";
				this.stacks[stackIndex].categories[categoryIndex].tooltip.innerHTML = this.categories[categoryIndex] + ": " + data[stackIndex][categoryIndex];
			}	
		}
	};
	
	this.draw();
	return this;
};
